import Link from 'next/link';

const ProfilePage = () => {
  return (
    <main className="p-4 grow overflow-y-scroll">
      <div className="max-w-md mx-auto overflow-hidden">
        <div className="text-center my-12 text-3xl font-semibold">
          <p className="text-gray-700">You are not logged in yet</p>
          <p className="my-12 ">
            <Link
              className="mx-auto gradient-bg text-white py-2 px-6 font-semibold rounded-xl"
              href="/auth/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
