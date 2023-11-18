import { dbConnect } from '@/dbConfig/db-config';
import Product from '@/models/product';

export const dynamic = 'force-dynamic';

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
