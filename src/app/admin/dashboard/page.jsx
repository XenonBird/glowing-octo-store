'use client';
import Header from '@/app/components/header';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          setLoading(false);
        } else {
          console.log('Failed to fetch data');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (productId) => {
    // Implement edit logic here
    console.log(`Edit product with ID: ${productId}`);
  };

  const handleDelete = (productId) => {
    // Implement delete logic here
    console.log(`Delete product with ID: ${productId}`);
  };

  return (
    <>
      <Header fullHeader={false} />
      <hr />
      <main className="w-full overflow-y-scroll">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl p-4 font-semibold mb-4">Product Dashboard</h2>

          {loading ? (
            <p className="text-lg">Loading...</p>
          ) : (
            <>
              <Link
                href="/admin/new"
                className="m-4 max-w-xs font-semibold block px-4 py-2 bg-green-500 text-white text-center rounded-lg text-xl "
              >
                Add new
              </Link>
              <table className="w-full m-4 overflow-y-scroll">
                <thead>
                  <tr>
                    {/* <th className="py-2 px-4 border">Id</th> */}
                    <th className="py-2 px-4 border">Name</th>
                    <th className="py-2 px-4 border">Brand</th>
                    <th className="py-2 px-4 border">Price (from)</th>
                    <th className="py-2 px-4 border">Price (to)</th>
                    <th className="py-2 px-4 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <TableRow key={product._id} rowData={product} />
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </main>
    </>
  );
};

function TableRow({ rowData }) {
  return (
    <tr key={rowData._id}>
      {/* <td className="py-2 px-4 border">{rowData._id}</td> */}
      <td className="py-2 px-4 border">{rowData.name}</td>
      <td className="py-2 px-4 border">{rowData.brand}</td>
      <td className="py-2 px-4 border">{rowData.price.min}</td>
      <td className="py-2 px-4 border">{rowData.price.max}</td>

      <td className="py-2 px-4 border  flex gap-2 items-center">
        <Link
          href={`/tabs/home/${rowData._id}`}
          className="px-4 py-2 bg-green-500 rounded-lg"
        >
          <i className="fi fi-rr-eye flex text-lg text-white"></i>
        </Link>
        <Link
          href={`/admin/edit/${rowData._id}`}
          className="px-4 py-2 bg-yellow-500 rounded-lg"
        >
          <i className="fi fi-rr-pencil flex text-lg text-white"></i>
        </Link>
        <Link
          href={`/admin/delete/${rowData._id}`}
          className="px-4 py-2 bg-red-500 rounded-lg"
        >
          <i className="fi fi-rr-trash flex text-lg text-white"></i>
        </Link>
      </td>
    </tr>
  );
}

export default Dashboard;
