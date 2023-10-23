import Header from '@/components/header';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="min-h-[80vh] flex flex-col">
      <Header />
      <div className="grow text-center flex flex-col justify-center items-center gap-6">
        <h1 className="text-4xl font-bold mb-4">
          <span>Page Not Found</span>
        </h1>
        <p className="text-lg mb-8">
          The page you are looking for <br /> does not exist.
        </p>
        <Link
          href="/tabs/home"
          className="gradient-bg text-white py-2 px-4 text-lg font-semibold rounded-xl"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
