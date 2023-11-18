import getTokenData from '@/helper/token';
import fs from 'fs/promises';
import path from 'path';
import { fileTypeFromBuffer } from 'file-type';
import slugify from 'slugify';
import { productValidationSchema } from '@/validation/zod-schemas';
import Product from '@/models/product';

export async function POST(request) {
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

    const formData = await request.formData();

    const data = {};
    for (const entry of formData.entries()) data[entry[0]] = entry[1];

    if (!data.image.size) {
      return Response.json(
        { message: 'Please select an image' },
        { status: 400 }
      );
    }

    const bytes = await data.image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const x = await fileTypeFromBuffer(buffer);

    const isImage = x.mime.includes('image/');
    if (!isImage) {
      return Response.json(
        { message: 'Please select a valid image' },
        { status: 404 }
      );
    }

    const fileDir =
      '/uploads/img-' +
      new Date().getTime() +
      '-' +
      slugify(data.name) +
      '.' +
      x.ext;

    const dir = path.join(process.cwd(), 'public', fileDir);

    const validProductData = {
      name: data.name,
      brand: data.brand,
      imageUrl: fileDir,
      description: data.description,
      price: {
        min: parseInt(data.priceMin),
        max: parseInt(data.priceMax),
        note: data.priceNote,
      },
      features: {
        display: data.display,
        processor: data.processor,
        ram: data.ram,
        storage: data.storage,
        camera: data.camera,
        connectivity: data.connectivity,
      },
    };

    const validatedData = productValidationSchema.safeParse(validProductData);
    if (!validatedData.success) {
      return Response.json(
        { message: validatedData.error.issues[0].message },
        { status: 400 }
      );
    }

    await fs.writeFile(dir, buffer);
    const newProduct = new Product(validatedData.data);
    const savedProduct = await newProduct.save();

    return Response.json(savedProduct, { status: 201 });
  } catch (error) {
    console.error('🔴', error);
    return Response.json({ error: error.message }, { status: 400 });
  }
}
