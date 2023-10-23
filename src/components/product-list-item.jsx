import Link from 'next/link';

function ProductListItem({ address }) {
  return (
    <Link href={address} className="p-2 flex gap-2 border shadow-md">
      <div className="w-1/4 text-center">
        <img src="/products/samsung-s22-ultra.jpg" alt="Product Image" />
        <small className="text-gray-500">Qty: 1</small>
      </div>
      <div className="w-1/2 flex flex-col justify-center">
        <h6>
          SAMSUNG GALAXY S21 FE 5G With Snapdragon 888 (8/128)GB, GRAPHITE
        </h6>
        <p className="text-gray-500">Samsung</p>
        <p className="text-sm text-red-500">Hurry! only 1 item left.</p>
      </div>
      <div className="w-1/4 text-center flex flex-col justify-around">
        <i className="fi fi-rr-trash text-3xl"></i>
        {/* <p className="text-uppercase text-sm text-gray-500">31,999.00 X 1</p> */}
        <h6>₹31,999.00</h6>
      </div>
    </Link>
  );
}

export default ProductListItem;
