'use client';
import Image from 'next/image';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

function LogoutScreen() {
  const handleLogout = async () => {
    console.log('triggered');
    const t = toast.loading('Processing');
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'GET',
        credentials: 'same-origin',
      });
      const body = await response.json();
      if (response.status === 200) {
        toast.success(body.message, { id: t });
      } else {
        toast.error(body.message, { id: t });
      }
    } catch (error) {
      toast.error(error.message, { id: t });
    }
  };

  return (
    <main className="w-full p-8">
      <div className="mx-auto max-w-sm bg-white p-8 rounded-lg border shadow-lg">
        <div className="flex justify-center items-center overflow-hidden mb-4">
          <Image
            src="/logo.png"
            width={50}
            height={60}
            className="h-10 w-auto"
            alt="site-logo"
          />
        </div>
        <h2 className="text-2xl font-semibold mb-4 capitalize">Logout</h2>
        <p className="mb-4">Are you sure you want to log out?</p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleLogout()}
            className="w-full py-2 bg-red-500 font-semibold text-white rounded-lg"
          >
            Logout
          </button>
          <Link
            href="/tabs/home"
            className="block w-full py-2 gradient-bg font-semibold text-white rounded-lg text-center"
          >
            Go back
          </Link>
        </div>
      </div>
      <Toaster />
    </main>
  );
}

export default LogoutScreen;
