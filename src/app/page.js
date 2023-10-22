import Header from '@/components/header';
import Link from 'next/link';

const WelcomePage = () => {
  return (
    <div className="min-h-[80vh] flex flex-col">
      <Header />
      <div className="grow text-center flex flex-col justify-center items-center gap-6">
        <h1 className="text-4xl font-bold mb-4">
          <span>Welcome to</span>
          <br />
          <span className="gradient-text">Octopus Mobi</span>
        </h1>
        <p className="text-lg mb-8">Your Trusted Second-Hand Mobile Store</p>
        <Link
          href="/tabs/home" // Link to your products page
          className="gradient-bg text-white py-2 px-4 text-lg font-semibold rounded-xl"
        >
          Explore Products
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
