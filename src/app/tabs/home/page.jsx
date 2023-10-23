import ProductCard from '@/components/product-card';
import Link from 'next/link';

function HomePage() {
  return (
    <main className="w-full overflow-y-scroll">
      <div className="max-w-6xl mx-auto">
        <ProductSection text="new arrivals" address="">
          <ProductCard product={{}} address="/tabs/product" />
          <ProductCard product={{}} address="/tabs/product" />
          <ProductCard product={{}} address="/tabs/product" />
        </ProductSection>

        <ProductSection text="recommended" address="">
          <ProductCard product={{}} address="/tabs/product" />
          <ProductCard product={{}} address="/tabs/product" />
          <ProductCard product={{}} address="/tabs/product" />
        </ProductSection>

        <ProductSection text="todays offer" address="">
          <ProductCard product={{}} address="/tabs/product" />
          <ProductCard product={{}} address="/tabs/product" />
          <ProductCard product={{}} address="/tabs/product" />
        </ProductSection>
      </div>
    </main>
  );
}

function ProductSection({ children, text, address }) {
  return (
    <>
      <h3 className="max-w-6xl mx-auto mt-4 p-2 text-center text-xl font-semibold gradient-text capitalize">
        {text}
      </h3>
      <div className="max-w-6xl mx-auto p-2 grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {children}
      </div>
      <p className="max-w-6xl mx-auto p-2 px-6 text-right underline font-semibold opacity-60">
        <Link href={address}>more...</Link>
      </p>
    </>
  );
}

export default HomePage;
