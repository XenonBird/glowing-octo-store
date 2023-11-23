import getTokenData from '@/helper/token';
import fs from 'fs/promises';
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

    const data = {};
    const formData = await request.formData();
    for (const entry of formData.entries()) data[entry[0]] = entry[1];

    const validProductData = {
      name: data.name,
      brand: data.brand,
      imageUrl: data.imageUrl,
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

    const newProduct = new Product(validatedData.data);
    const savedProduct = await newProduct.save();

    return Response.json(savedProduct, { status: 201 });
  } catch (error) {
    console.error('🔴', error);
    return Response.json({ error: error.message }, { status: 400 });
  }
}
