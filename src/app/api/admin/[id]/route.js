import { dbConnect } from '@/dbConfig/db-config';
import getTokenData from '@/helper/token';
import Product from '@/models/product';

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

    await dbConnect();
    const productId = params.id;
    const data = await request.json();

    const res = await Product.findByIdAndUpdate(productId, data);

    if (res) {
      return Response.json({ data: res }, { status: 200 });
    } else {
      return Response.json({ message: 'Product not found' }, { status: 404 });
    }
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
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
