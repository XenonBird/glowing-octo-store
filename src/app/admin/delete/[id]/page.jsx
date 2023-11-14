'use client';
import Link from 'next/link';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function DeletePage({ params }) {
  const productId = params.id;
  const [done, setDone] = useState(false);

  const handleDelete = async () => {
    const toastId = toast.loading('Please wait', {
      style: { backgroundColor: '#333', color: '#8f8' },
    });
    const res = await fetch(`/api/admin/${productId}`, { method: 'DELETE' });
    if (res.status === 200) {
      setDone('Deleted');
      toast.success('Deleted', { id: toastId });
    }
    if (res.status !== 200) {
      const body = await res.json();
      setDone('Failed');
      toast.error(`Failed: ${body.message}`, { id: toastId });
    }
  };

  return (
    <main className="w-full p-8">
      <div className="mx-auto max-w-sm bg-white p-8 rounded-lg border shadow-lg flex flex-col gap-6">
        <p className="font-semibold ">
          Are you really want to delete this item {params.id}
        </p>

        {!done ? (
          <button
            onClick={handleDelete}
            className="block text-white bg-red-500 rounded-md py-3 px-6"
          >
            Delete
          </button>
        ) : (
          <p className="block font-semibold text-center bg-white text-green-500 rounded-md py-3 px-6">
            {done}
          </p>
        )}
        <Link
          href="/admin/dashboard"
          className="block text-white bg-blue-500 rounded-md py-3 px-6 text-center"
        >
          Back
        </Link>

        <Toaster />
      </div>
    </main>
  );
}

export default DeletePage;
