import React from 'react';

const ProductCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="text-center">
        <img
          src="https://m.media-amazon.com/images/I/71J8tz0UeJL._SX569_.jpg"
          alt="Product Image"
          className="w-64 h-64 object-contain mx-auto"
        />
      </div>
      <div className="text-center mt-4">
        <h6 className="text-lg font-semibold">Samsung S22 Ultra</h6>
        <small className="text-gray-500">SAMSUNG</small>
        <small className="text-gray-500">
          Quality: Supermint-Condition (Out Of Warranty)
        </small>
        <h6 className="text-xl font-bold text-primary">
          ₹9,499.00{' '}
          <small className="text-gray-500">
            <del className="opacity-60">₹20,499.00</del>
          </small>
          <p className="text-red-600">Your save ₹11000</p>
        </h6>
        <button
          className="bg-sky-600 text-white px-4 py-2 rounded-full mt-4"
          expand="full"
          size="small"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
