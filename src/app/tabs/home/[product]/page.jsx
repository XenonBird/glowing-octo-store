import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  openGraph: {
    title: 'Samsung Galaxy S23 Ultra',
    description: 'Get Samsung Galaxy S23 Ultra at most affordable price',
    images: ['/products/samsung-s22-ultra.jpg'],
  },
};

const ProductDetail = ({ params }) => {
  return (
    <main className="w-full grow overflow-y-scroll">
      <div className="max-w-6xl mx-auto mt-4 p-4">
        <div className="flex flex-wrap gap-4">
          <p>{params.product}</p>
          <div className="w-full md:w-1/2">
            <Image
              src="/products/samsung-s22-ultra.jpg"
              width={360}
              height={360}
              alt="Product Image"
              className="rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl font-semibold mb-2">
              SAMSUNG GALAXY S21 FE 5G With Snapdragon 888 (8/128)GB, GRAPHITE
            </h1>
            <p className="text-gray-500">By Samsung</p>
            <div className="my-4">
              <p className="text-gray-500">In Stock</p>
              <h2 className="text-2xl font-semibold text-green-600">
                ₹9,499.00 - ₹14,499.00
              </h2>
              <p className="w-40 ml-auto text-xs">
                Price depends on the condition of the mobile <br />
                better and newer mobiles will be higher in price and vice-versa
              </p>
              <div className="my-4">
                <h3 className="text-xl font-semibold">Key Features</h3>
                <ul className="list-disc pl-4">
                  <li>6.7&quot; AMOLED Display</li>
                  <li>Snapdragon 888 CPU</li>
                  <li>8GB RAM, 128GB Storage</li>
                  <li>Triple Camera System</li>
                  <li>5G Connectivity</li>
                </ul>
              </div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Add to Cart
            </button>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Product Description</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            congue metus vel nunc feugiat, eget dictum nunc dictum. Donec vel
            orci non odio varius volutpat sit amet et justo. Vivamus non purus
            lectus. Vivamus eleifend tristique.
          </p>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Mobile Specifications</h2>
          <table className="table-auto">
            <tbody>
              <tr>
                <td className="pr-4">Display</td>
                <td>6.7&quot; AMOLED</td>
              </tr>
              <tr>
                <td className="pr-4">Processor</td>
                <td>Snapdragon 888</td>
              </tr>
              <tr>
                <td className="pr-4">RAM</td>
                <td>8GB</td>
              </tr>
              <tr>
                <td className="pr-4">Storage</td>
                <td>128GB</td>
              </tr>
              <tr>
                <td className="pr-4">Camera</td>
                <td>Triple Camera System</td>
              </tr>
              <tr>
                <td className="pr-4">Connectivity</td>
                <td>5G</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Customer Reviews</h2>
          {/* Add a section for customer reviews here */}
        </div>
      </div>
      <Link
        href="https://wa.me/917584085151?text=https%3A%2F%2Foctopus-mobi.vercel.app%2Ftabs%2Fhome%2Fsamsung-galaxy-s23%0A*SAMSUNG%20GALAXY%20S21%20FE%205G*%0A.%0A.%0AHi%20there%2C%20%0AI'm%20intrested%20in%20this%20mobile"
        className="fixed bottom-[calc(61px+1rem)] right-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-md tap-highlight-disable"
      >
        <i className="fi fi-brands-whatsapp text-white text-4xl flex items-center"></i>
      </Link>
    </main>
  );
};

export default ProductDetail;
