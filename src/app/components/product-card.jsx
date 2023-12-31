import Link from 'next/link';
import { CloudinaryImage } from './coudinary-image';

const ProductCard = ({ product, shrink }) => {
  return (
    <Link
      href={`/tabs/home/${product._id}`}
      className={`${
        !shrink ? 'min-w-[180px] max-w-[300px] snap-start' : ''
      } bg-white rounded-lg shadow-lg p-4 cursor-pointer border flex flex-col`}
    >
      <div className="text-center aspect-square">
        <CloudinaryImage
          src={product.imageUrl}
          width={200}
          height={200}
          alt={product.name}
          className="rounded-lg"
          sizes="100vw"
        />
      </div>
      <div className="mt-2 text-xs grow flex flex-col gap-1 justify-between">
        <h6 className="text-md font-bold text-center">{product.name}</h6>
        {/* <p className="text-gray-500 text-[0.5rem]">
          <span className="p-1 rounded bg-slate-300">Samsung</span>{' '}
          <span className="p-1 rounded bg-slate-300">Mobile</span>
        </p> */}
        <p className="text-gray-500 flex justify-between flex-wrap gap-2">
          <span className="font-semibold opacity-60">No scratches</span>
          {/* <span className="flex gap-[2px]">
            <i className="fi fi-sr-star text-yellow-500"></i>
            <i className="fi fi-sr-star text-yellow-500"></i>
            <i className="fi fi-sr-star text-yellow-500"></i>
            <i className="fi fi-rr-star-sharp-half-stroke text-yellow-500"></i>
            <i className="fi fi-rr-star text-yellow-500"></i>
          </span> */}
        </p>
        {/* <h6 className="text-md font-bold text-primary"> */}
        <p className="font-semibold text-gray-500 line-through">₹20,499.00</p>
        <p className="font-semibold text-green-600">save up to ₹11,000.00</p>
        {/* </h6> */}
        <div className="flex justify-center">
          <p className="px-4 py-2 gradient-bg text-white font-semibold rounded-lg">
            {/* Buy at ₹9,499.00 */}₹{product.price.min} - ₹{product.price.max}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
