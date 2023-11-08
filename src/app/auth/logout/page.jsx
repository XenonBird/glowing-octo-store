import Image from 'next/image';
import Link from 'next/link';

function LogoutScreen() {
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
            // onClick={() => {}}
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
    </main>
  );
}

export default LogoutScreen;
