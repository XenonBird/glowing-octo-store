import Image from 'next/image';
import CustomMenu from '@/app/components/menu';

function Header() {
  return (
    <header className="w-full">
      <div className="max-w-6xl mx-auto p-4 py-2 grid grid-cols-3 items-center">
        <CustomMenu />
        <div className="flex justify-center items-center overflow-hidden">
          <Image src="/netflix.png" width={50} height={20} alt="site-logo" />
        </div>
        <div></div>
      </div>
      <div className="max-w-6xl mx-auto p-2 pt-0 text-xl border-b flex justify-center">
        <div className="flex justify-center p-0 items-center border overflow-hidden rounded-lg">
          <input
            className="p-1 px-2"
            type="search"
            name="search"
            id="search"
            placeholder="Search"
          />
          <i className="fi fi-rr-search text-xl p-2"></i>
        </div>
      </div>
    </header>
  );
}

export default Header;
