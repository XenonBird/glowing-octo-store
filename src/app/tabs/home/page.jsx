import ProductCard from '@/components/product-card';

function HomePage() {
  return (
    <main className="w-full overflow-y-scroll">
      <div className="max-w-6xl mx-auto p-2 grow flex flex-col gap-2">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </main>
  );
}

export default HomePage;
