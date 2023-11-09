import Image from 'next/image';
import CustomMenu from '@/app/components/menu';
import SearchBox from './search-box';

function Header({ fullHeader = true }) {
  return (
    <header className="w-full border-b">
      <div className="max-w-6xl mx-auto p-4 py-2 grid grid-cols-3 items-center">
        {fullHeader ? <CustomMenu /> : <div></div>}
        <div className="flex justify-center items-center overflow-hidden">
          <Image
            src="/logo.png"
            width={100}
            height={40}
            className="h-10 w-auto"
            alt="site-logo"
          />
        </div>
        {fullHeader ? <SearchBox /> : <div></div>}
      </div>
    </header>
  );
}

export default Header;
