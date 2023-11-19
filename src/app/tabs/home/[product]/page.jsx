import { dbConnect } from '@/dbConfig/db-config';
import Product from '@/models/product';
import WebsiteConfig from '@/models/websiteConfig';
import mongoose from 'mongoose';
import Image from 'next/image';
import Link from 'next/link';

// Dynamic metadata
export async function generateMetadata({ params }) {
  await dbConnect();
  var product;
  const data = await WebsiteConfig.findOne({});
  var product = {};
  if (mongoose.isValidObjectId(params.product)) {
    product = await Product.findById(params.product);
  }

  return {
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.imageUrl],
    },
  };
}

const ProductDetail = async ({ params }) => {
  await dbConnect();
  const data = await WebsiteConfig.findOne({});
  var product = {};
  if (mongoose.isValidObjectId(params.product)) {
    product = await Product.findById(params.product);
  } else {
    return (
      <main className="w-full grow overflow-y-scroll">
        <div className="max-w-6xl mx-auto mt-4 p-4">
          <p className="font-semibold text-lg text-center">Product not found</p>
        </div>
      </main>
    );
  }

  const whatsappLink = `https://wa.me/91${
    data.adminPhoneNumber
  }?text=Hi%20there%2C%0AI%20am%20interested%20in%20%0A*${product.name
    .trim()
    .replace(' ', '%20')}*%0Ahttps://octopus-mobi.vercel.app/tabs/home/${
    params.product
  }`;

  return (
    <main className="w-full grow overflow-y-scroll">
      <div className="max-w-6xl mx-auto mt-4 p-4">
        <div className="flex flex-wrap gap-4">
          {/* <p>{params.product}</p> */}
          <div className=" max-w-xs mx-auto md:w-1/2 p-4 text-center">
            <Image
              // unoptimized
              src={product.imageUrl}
              width={360}
              height={360}
              alt={product.name}
              className="rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
            <p className="text-gray-500">By {product.brand}</p>
            <div className="my-4">
              <p className="text-gray-500">In Stock</p>
              <h2 className="text-2xl font-semibold text-green-600">
                ₹{product.price.min} - ₹{product.price.max}
              </h2>
              <p className="w-40 ml-auto text-xs">
                Price depends on the condition of the mobile <br />
                better and newer mobiles will be higher in price and vice-versa
              </p>
              <div className="my-4">
                <h3 className="text-xl font-semibold">Key Features</h3>
                <ul className="list-disc pl-4">
                  <li>{product.features.display}</li>
                  <li>{product.features.processor}</li>
                  <li>{product.features.storage}</li>
                  <li>{product.features.camera}</li>
                  <li>{product.features.connectivity}</li>
                </ul>
              </div>
            </div>
            {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Add to Cart
            </button> */}
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Product Description</h2>
          <p>{product.description}</p>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Mobile Specifications</h2>
          <table className="table-auto">
            <tbody>
              <tr>
                <td className="pr-4">Display</td>
                <td>{product.features.display}</td>
              </tr>
              <tr>
                <td className="pr-4">Processor</td>
                <td>{product.features.processor}</td>
              </tr>
              <tr>
                <td className="pr-4">Storage</td>
                <td>{product.features.storage}</td>
              </tr>
              <tr>
                <td className="pr-4">Camera</td>
                <td>{product.features.camera}</td>
              </tr>
              <tr>
                <td className="pr-4">Connectivity</td>
                <td>{product.features.connectivity}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8  bg-gray-900">
          <h2 className="text-xl font-semibold border-b border-b-white text-white">
            For developer only
          </h2>
          {/* Add a section for customer reviews here */}
          <pre className="text-left text-white">
            {JSON.stringify(product, null, 4)}
          </pre>
        </div>
      </div>

      <Link
        href={whatsappLink}
        className="fixed bottom-[calc(61px+1rem)] right-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-md tap-highlight-disable"
      >
        <i className="fi fi-brands-whatsapp text-white text-4xl flex items-center"></i>
      </Link>
    </main>
  );
};

export default ProductDetail;
