'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

function TabBar() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname);

  return (
    <nav className="w-full">
      <div className="max-w-md mx-auto p-1 flex gap-1 justify-around items-center border-t">
        <NavLink
          href="/tabs/home"
          active={activeTab === '/tabs/home'}
          text="Shop"
          icon="fi fi-rr-store-alt"
          setActiveTab={setActiveTab}
        />
        <NavLink
          href="/tabs/wishlist"
          active={activeTab === '/tabs/wishlist'}
          text="Wishlist"
          icon="fi fi-rr-heart"
          setActiveTab={setActiveTab}
        />
        <NavLink
          href="/tabs/cart"
          active={activeTab === '/tabs/cart'}
          text="Cart"
          icon="fi fi-rr-shopping-bag"
          setActiveTab={setActiveTab}
        />
        <NavLink
          href="/tabs/profile"
          active={activeTab === '/tabs/profile'}
          text="Profile"
          icon="fi fi-rr-user"
          setActiveTab={setActiveTab}
        />
      </div>
    </nav>
  );
}

function NavLink({ href, active, text, icon, setActiveTab }) {
  const handleClick = () => {
    setActiveTab(href);
  };

  return (
    <Link
      href={href}
      className={`w-full h-full pt-2 pb-1 flex flex-col items-center text-white rounded-md tap-highlight-disable ${
        active ? 'active-tab' : ''
      }`}
      onClick={handleClick}
    >
      <i className={active ? icon + ' text-white' : icon} />
      <p className={active ? 'text-xs' + ' text-white' : 'text-xs'}>{text}</p>
    </Link>
  );
}

export default TabBar;
