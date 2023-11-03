import { dbConnect } from '@/dbConfig/db-config';
import Product from '@/models/product';

export async function GET(request) {
  try {
    await dbConnect();
    const res = await Product.find({});

    const data = res.map((obj) => {
      return {
        _id: obj._id,
        name: obj.name,
        brand: obj.brand,
        imageUrl: obj.imageUrl,
        price: {
          min: obj.price.min,
          max: obj.price.max,
        },
      };
    });

    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 404 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    // console.log(data);
    const newProduct = new Product(data);
    // validation goes here
    const savedProduct = await newProduct.save();

    return Response.json(savedProduct, { status: 201 });
  } catch (error) {
    return Response.json({ error }, { status: 404 });
  }
}
