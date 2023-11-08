import Link from 'next/link';
import { cookies } from 'next/headers';
import getTokenData from '@/helper/token';

const ProfilePage = ({ params }) => {
  const incomingToken = cookies()?.get('token')?.value;

  const tokenDecode = getTokenData(incomingToken);

  console.log('tokenDecode.success', tokenDecode.success);
  if (tokenDecode.success) {
    console.log('tokenDecode.data', tokenDecode.data);
  } else {
    console.log('tokenDecode.message', tokenDecode.message);
  }

  if (tokenDecode.success && tokenDecode?.data?.isAdmin) {
    return (
      <Frame>
        <>
          <p className="text-gray-700">Hi Admin</p>
          <p className="my-12 flex flex-col gap-4">
            <Link
              className="mx-auto gradient-bg text-white py-2 px-6 font-semibold rounded-xl"
              href="/admin/dashboard"
            >
              Dashboard
            </Link>
            <Link
              className="mx-auto gradient-bg text-white py-2 px-6 font-semibold rounded-xl"
              href="/admin/new"
            >
              Add item
            </Link>
            <Link
              className="mx-auto text-red-500 py-2 px-6 font-semibold rounded-xl"
              href="/auth/logout"
            >
              Logout
            </Link>
          </p>
        </>
      </Frame>
    );
  }

  if (tokenDecode.success) {
    return (
      <Frame>
        <>
          <p className="text-gray-700">
            Hi {cookies()?.get('username')?.value}
          </p>
          <p className="my-22">
            <Link
              className="mx-auto gradient-text py-2 px-6 font-semibold rounded-xl"
              href="/auth/logout"
            >
              Logout
            </Link>
          </p>
        </>
      </Frame>
    );
  }

  return (
    <Frame>
      <>
        <p className="text-gray-700">Please login</p>
        <p className="my-12 ">
          <Link
            className="mx-auto gradient-bg text-white py-2 px-6 font-semibold rounded-xl"
            href="/auth/login"
          >
            Login
          </Link>
        </p>
      </>
    </Frame>
  );
};

const Frame = ({ children }) => {
  return (
    <main className="p-4 grow overflow-y-scroll">
      <div className="max-w-md mx-auto overflow-hidden">
        <div className="text-center my-12 text-3xl font-semibold">
          {children}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
