import ProductCard from '@/components/product-card';

function HomePage() {
  return (
    <main className="w-full overflow-y-scroll">
      <div className="max-w-6xl mx-auto p-2 grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 justify-items-center">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </main>
  );
}

export default HomePage;
