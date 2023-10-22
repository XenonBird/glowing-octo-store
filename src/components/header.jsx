import Image from 'next/image';

function Header() {
  return (
    <header className="w-full">
      <div className="max-w-6xl mx-auto px-2 flex justify-between items-center">
        <div></div>
        <div className="flex justify-center items-center overflow-hidden">
          <Image src="/netflix.png" width={50} height={20} />
        </div>
        <div className="h-[30px] aspect-square flex justify-center items-center">
          <i className="fi fi-rr-bars-sort text-xl"></i>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-2 pt-0 text-xl border-b">
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
