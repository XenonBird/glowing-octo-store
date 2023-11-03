import MobileBrandBar from '@/app/components/brand-bar';
import ProductCard from '@/app/components/product-card';
import { dbConnect } from '@/dbConfig/db-config';
import Product from '@/models/product';
import Link from 'next/link';

async function HomePage() {
  await dbConnect();
  const productsList = await Product.find();

  return (
    <main className="w-full overflow-y-scroll">
      <div className="max-w-6xl mx-auto">
        <MobileBrandBar />

        <ProductSection text="new arrivals" scroll={true} address="">
          {productsList.map((p) => (
            <ProductCard product={p} key={p._id} />
          ))}
        </ProductSection>

        <ProductSection text="recommended" scroll={false} address="">
          {productsList.map((p) => (
            <ProductCard product={p} shrink={true} key={p._id} />
          ))}
        </ProductSection>

        <ProductSection text="todays offer" scroll={false} address="">
          {productsList.map((p) => (
            <ProductCard product={p} shrink={true} key={p._id} />
          ))}
        </ProductSection>
      </div>
    </main>
  );
}

function ProductSection({ children, text, address, scroll }) {
  return (
    <>
      <h3 className="max-w-6xl mx-auto mt-4 p-2 text-center text-xl font-semibold gradient-text capitalize">
        {text}
      </h3>
      {/* <div className="max-w-6xl mx-auto p-2 grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2"> */}
      <div
        className={`max-w-6xl mx-auto relative p-2 gap-2 ${
          scroll
            ? 'flex flex-nowrap overflow-x-scroll snap-mandatory snap-x'
            : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
        }`}
      >
        {children}
      </div>
      <p className="max-w-6xl mx-auto p-2 px-6 text-right underline font-semibold opacity-60">
        <Link href={address}>more...</Link>
      </p>
    </>
  );
}

export default HomePage;
