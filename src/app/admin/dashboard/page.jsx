'use client';
import Header from '@/app/components/header';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  const dummyProducts = [
    {
      _id: '1',
      name: 'Product1',
      brand: 'BrandA',
      description: 'This is the first product.',
    },
    {
      _id: '2',
      name: 'Product2',
      brand: 'BrandB',
      description: 'This is the second product.',
    },
    {
      _id: '3',
      name: 'Product3',
      brand: 'BrandC',
      description: 'This is the third product.',
    },
  ];

  useEffect(() => {
    // Simulate fetching data from an API or database
    setTimeout(() => {
      setProducts(dummyProducts);
    }, 1000);
  }, []);

  const handleEdit = (productId) => {
    // Implement edit logic
    console.log(`Edit product with ID: ${productId}`);
  };

  const handleDelete = (productId) => {
    // Implement delete logic
    console.log(`Delete product with ID: ${productId}`);
  };

  return (
    <>
      <Header fullHeader={false} />
      <hr />
      <main className="w-full overflow-y-scroll">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl p-4 font-semibold mb-4">Product Dashboard</h2>

          <table className="w-full m-4 overflow-y-scroll">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Brand</th>
                <th className="py-2 px-4 border">Description</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="py-2 px-4 border">{product.name}</td>
                  <td className="py-2 px-4 border">{product.brand}</td>
                  <td className="py-2 px-4 border">{product.description}</td>
                  <td className="py-2 px-4 border">
                    <Link
                      href=""
                      className="px-2 py-1 mr-2 bg-blue-500 text-white rounded-lg"
                      onClick={() => handleEdit(product._id)}
                    >
                      Edit
                    </Link>
                    <Link
                      href=""
                      className="px-2 py-1 bg-red-500 text-white rounded-lg"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
