import Link from 'next/link';

function TabBar() {
  return (
    <nav className="w-full">
      <div className="max-w-md mx-auto flex justify-around items-center border-t">
        <Link
          href="/tabs/home"
          className="w-full h-full pt-2 pb-1 flex flex-col items-center"
        >
          <i className="fi fi-rr-store-alt text-xl"></i>
          <p className="text-xs">Shop</p>
        </Link>

        <Link
          href="/tabs/wishlist"
          className="w-full h-full pt-2 pb-1 flex flex-col items-center"
        >
          <i className="fi fi-rr-heart text-xl"></i>
          <p className="text-xs">Wishlist</p>
        </Link>

        <Link
          href="/tabs/cart"
          className="w-full h-full pt-2 pb-1 flex flex-col items-center"
        >
          <i className="fi fi-rr-shopping-bag text-xl"></i>
          <p className="text-xs">Cart</p>
        </Link>

        <Link
          href="/tabs/profile"
          className="w-full h-full pt-2 pb-1 flex flex-col items-center"
        >
          <i className="fi fi-rr-user text-xl"></i>
          <p className="text-xs">Profile</p>
        </Link>
      </div>
    </nav>
  );
}

export default TabBar;
