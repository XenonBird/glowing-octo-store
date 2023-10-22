import Image from 'next/image';

const ProductCard = () => {
  return (
    <div className="max-w-[400px] bg-white rounded-lg shadow-lg p-4 cursor-pointer">
      <div className="text-center aspect-square">
        <Image
          width={360}
          height={360}
          src="/products/samsung-s22-ultra.jpg"
          alt="Product Image"
          className="w-64 h-64 object-cover mx-auto border"
        />
      </div>
      <div className="mt-2 text-sm flex flex-col gap-1">
        <h6 className="text-lg font-semibold text-center">Samsung S22 Ultra</h6>
        <p className="text-gray-500 text-[0.5rem]">
          <span className="p-1 rounded bg-slate-300">Samsung</span>{' '}
          <span className="p-1 rounded bg-slate-300">Mobile</span>
        </p>
        <p className="text-gray-500 flex justify-between flex-wrap gap-2">
          <span className="font-semibold opacity-50">No scratches</span>
          <span className="flex gap-[2px]">
            <i class="fi fi-sr-star text-yellow-500"></i>
            <i class="fi fi-sr-star text-yellow-500"></i>
            <i class="fi fi-sr-star text-yellow-500"></i>
            <i class="fi fi-rr-star-sharp-half-stroke text-yellow-500"></i>
            <i class="fi fi-rr-star text-yellow-500"></i>
          </span>
        </p>
        <h6 className="text-md font-bold text-primary">
          <p className="text-gray-500 line-through">₹20,499.00</p>
          <p className="text-red-600"> Your save ₹11,000.00</p>
        </h6>
        <div className="flex justify-center">
          <p className="my-2 px-4 py-2 gradient-bg font-semibold text-white rounded-full">
            Buy at ₹9,499.00
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
