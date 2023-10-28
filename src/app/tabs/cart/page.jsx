import ProductListItem from '@/app/components/product-list-item';

function WishlistTab() {
  return (
    <main className="w-full h-full overflow-y-scroll">
      <h3 className="max-w-6xl mx-auto mt-4 p-2 text-center text-xl font-semibold gradient-text capitalize">
        Your Cart
      </h3>
      <div className="max-w-6xl mx-auto p-2 grow grid grid-cols-1 md:grid-cols-2 gap-2 justify-items-center">
        <ProductListItem
          product={{}}
          address="/tabs/home/samsung-galaxy-s23-ultra"
        />
        <ProductListItem
          product={{}}
          address="/tabs/home/samsung-galaxy-s23-ultra"
        />
        <ProductListItem
          product={{}}
          address="/tabs/home/samsung-galaxy-s23-ultra"
        />
        <ProductListItem
          product={{}}
          address="/tabs/home/samsung-galaxy-s23-ultra"
        />
        <ProductListItem
          product={{}}
          address="/tabs/home/samsung-galaxy-s23-ultra"
        />
      </div>
    </main>
  );
}

export default WishlistTab;
