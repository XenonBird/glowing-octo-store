import { dbConnect } from '@/dbConfig/db-config';
import getTokenData from '@/helper/token';
import Product from '@/models/product';

export async function GET(request) {
  try {
    await dbConnect();
    const products = await Product.find({}, '_id name brand imageUrl price');

    const data = products.map((product) => ({
      ...product.toJSON(),
      price: {
        min: product.price.min,
        max: product.price.max,
      },
    }));

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.log('🔴', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const token = request.cookies?.get('token')?.value;
    const decodedToken = getTokenData(token);

    if (!decodedToken.success) {
      return Response.json({ message: 'Please login first' }, { status: 404 });
    }

    console.log('isAdmin', decodedToken.data.isAdmin);
    if (!decodedToken.data.isAdmin) {
      return Response.json(
        { message: 'You are not allowed here' },
        { status: 400 }
      );
    }

    const data = await request.json();
    const newProduct = new Product(data);

    // Add validation logic here
    // For example, you can validate data fields before saving

    const savedProduct = await newProduct.save();

    return Response.json(savedProduct, { status: 201 });
  } catch (error) {
    console.error('🔴', error);
    return Response.json({ error: error.message }, { status: 400 });
  }
}
