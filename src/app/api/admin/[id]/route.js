import { dbConnect } from '@/dbConfig/db-config';
import getTokenData from '@/helper/token';
import Product from '@/models/product';
import { fileTypeFromBuffer } from 'file-type';
import slugify from 'slugify';
import path from 'path';
import fs from 'fs/promises';
import { productValidationSchema } from '@/validation/zod-schemas';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const productId = params.id;

    const res = await Product.findOne({ _id: productId });

    if (res) {
      return Response.json({ data: res }, { status: 200 });
    } else {
      return Response.json({ message: 'Product not found' }, { status: 404 });
    }
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    // Extract the product ID from the request params
    const productId = params.id;

    // Validate the user's token
    const token = request.cookies?.get('token')?.value;
    const decodedToken = getTokenData(token);

    if (!decodedToken.success) {
      return Response.json({ message: 'Please login first' }, { status: 404 });
    }

    if (!decodedToken.data.isAdmin) {
      return Response.json(
        { message: 'You are not allowed here' },
        { status: 400 }
      );
    }

    // Fetch the existing product details
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return Response.json({ message: 'Product not found' }, { status: 404 });
    }

    // Parse form data
    const formData = await request.formData();

    // Extract data from the form
    const data = {};
    for (const entry of formData.entries()) data[entry[0]] = entry[1];

    // Check if a new image is provided
    if (data.image && data.image.size) {
      const bytes = await data.image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Check file type
      const x = await fileTypeFromBuffer(buffer);
      const isImage = x.mime.includes('image/');

      if (!isImage) {
        return Response.json(
          { message: 'Please select a valid image' },
          { status: 400 }
        );
      }

      // Update the product's image URL
      const fileDir =
        '/uploads/img-' +
        new Date().getTime() +
        '-' +
        slugify(existingProduct.name) +
        '.' +
        x.ext;

      const dir = path.join(process.cwd(), 'public', fileDir);
      await fs.writeFile(dir, buffer);

      existingProduct.imageUrl = fileDir;
    }

    // Update other product details
    existingProduct.name = data.name;
    existingProduct.brand = data.brand;
    existingProduct.description = data.description;
    existingProduct.price.min = parseInt(data.priceMin);
    existingProduct.price.max = parseInt(data.priceMax);
    existingProduct.price.note = data.priceNote;
    existingProduct.features.display = data.display;
    existingProduct.features.processor = data.processor;
    existingProduct.features.ram = data.ram;
    existingProduct.features.storage = data.storage;
    existingProduct.features.camera = data.camera;
    existingProduct.features.connectivity = data.connectivity;

    // Validate the updated product data
    const validatedData = productValidationSchema.safeParse(
      existingProduct.toJSON()
    );

    if (!validatedData.success) {
      return Response.json(
        { message: validatedData.error.issues[0].message },
        { status: 400 }
      );
    }

    // Save the updated product
    await existingProduct.save();

    return Response.json(existingProduct, { status: 200 });
  } catch (error) {
    console.error('🔴', error);
    return Response.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  const productId = params.id;
  try {
    const token = request.cookies?.get('token')?.value;
    const decodedToken = getTokenData(token);

    if (!decodedToken.success) {
      return Response.json({ message: 'Please login first' }, { status: 404 });
    }
    if (!decodedToken.data.isAdmin) {
      return Response.json(
        { message: 'You are not allowed here' },
        { status: 400 }
      );
    }

    // console.log(decodedToken);

    await dbConnect();
    const res = await Product.findByIdAndDelete(productId);
    if (res) {
      return Response.json(res, { status: 200 });
    } else {
      return Response.json({ message: 'Product not found' }, { status: 404 });
    }
  } catch (error) {
    return Response.json({ error: error.message, productId }, { status: 500 });
  }
}
