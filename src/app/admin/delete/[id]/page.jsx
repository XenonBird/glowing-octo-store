'use client';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function DeletePage({ params }) {
  const productId = params.id;
  const [done, setDone] = useState('');

  const handleDelete = async () => {
    const res = await fetch(`/api/admin/${productId}`, { method: 'DELETE' });
    if (res.status === 200) {
      setDone('Deleted');
      toast('🟢 Deleted', {
        style: { backgroundColor: '#333', color: '#8f8' },
      });
    }
    if (res.status !== 200) {
      setDone('Failed');
      toast('🔴 FailedF', {
        style: { backgroundColor: '#333', color: '#f88' },
      });
    }
  };

  return (
    <main className="w-full p-8">
      <div className="mx-auto max-w-sm bg-white p-8 rounded-lg border shadow-lg">
        <p className="font-semibold ">
          Are you really want to delete this item {params.id}
        </p>

        <button
          onClick={handleDelete}
          className="text-white bg-red-500 rounded-md my-6 py-3 px-6"
        >
          Delete
        </button>

        <p className="my-12 font-semibold text-green-500">{done}</p>
        <Toaster />
      </div>
    </main>
  );
}

export default DeletePage;
