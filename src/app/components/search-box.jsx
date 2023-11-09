'use client';
import { useState } from 'react';
import Popup from './popup';

const SearchBox = () => {
  const [openSearchBox, setOpenSearchBox] = useState(false);
  return (
    <div className="flex justify-end">
      <div
        className="h-[40px] aspect-square flex justify-center items-center rounded-md cursor-pointer"
        onClick={() => setOpenSearchBox(!openSearchBox)}
      >
        <i className="fi fi-rr-search text-xl gradient-text flex items-center"></i>
      </div>

      <Popup closer={setOpenSearchBox} openStatus={openSearchBox}>
        <h1 className="text-xl">What do you want?</h1>
        <div className="w-full mt-6 border-2 p-2 px-3 rounded-md">
          <input type="search" name="search" id="search" placeholder="Search" />
        </div>
        <div className="flex justify-end mt-3 mb-6">
          <i className="fi fi-rr-search text-xl gradient-text flex items-center p-3 border rounded-md"></i>
        </div>
        <p className="text-sm text-red-500">
          This is not functional available yet
        </p>
      </Popup>
    </div>
  );
};

export default SearchBox;
