import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

function LoginScreen({ params }) {
  if (params.auth !== 'login' && params.auth !== 'register') {
    redirect('/404');
  }
  return (
    <main className="w-full p-8">
      <div className="mx-auto max-w-sm bg-white p-8 rounded-lg border shadow-lg">
        <div className="flex justify-center items-center overflow-hidden mb-8 border-b">
          <Image src="/logo.png" width={50} height={20} alt="site-logo" />
        </div>
        <h2 className="text-2xl font-semibold mb-4 capitalize">
          {params.auth}
        </h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              placeholder="abcd@example.com"
            />
          </div>
          {params.auth === 'register' && (
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium text-gray-700">
                Full name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Tony Stark"
              />
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              placeholder="************"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 gradient-bg font-semibold text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>
        <div className="text-sm">
          <div className="my-8 border-t relative">
            <p className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1 border rounded-md">
              OR
            </p>
          </div>

          {params.auth === 'login' ? (
            <p>
              Don't have account?{' '}
              <Link
                className="underline gradient-text font-semibold"
                href="/auth/register"
              >
                Register
              </Link>
            </p>
          ) : (
            <p>
              Already have account?{' '}
              <Link
                className="underline gradient-text font-semibold"
                href="/auth/login"
              >
                Login
              </Link>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default LoginScreen;
