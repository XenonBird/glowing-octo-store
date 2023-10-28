'use client';
import { useRef, useState } from 'react';

const mobileBrands = [
  { name: 'Samsung', brandColor: '#1424A0', textColor: '#FFFFFF' }, // Samsung Blue
  { name: 'Xiaomi', brandColor: '#FF6700', textColor: '#000000' }, // Xiaomi Orange
  { name: 'Apple', brandColor: '#000000', textColor: '#FFFFFF' }, // Apple Black
  { name: 'OnePlus', brandColor: '#EB0028', textColor: '#FFFFFF' }, // OnePlus Red
  { name: 'Realme', brandColor: '#F46C25', textColor: '#FFFFFF' }, // Realme Yellow
  { name: 'Vivo', brandColor: '#0096D8', textColor: '#FFFFFF' }, // Vivo Blue
  { name: 'Oppo', brandColor: '#EF3340', textColor: '#FFFFFF' }, // Oppo Green
  { name: 'Nokia', brandColor: '#124191', textColor: '#FFFFFF' }, // Nokia Blue
  { name: 'Asus', brandColor: '#000000', textColor: '#FFFFFF' }, // Asus Black
  { name: 'Motorola', brandColor: '#000000', textColor: '#FFFFFF' }, // Motorola Black
  { name: 'Poco', brandColor: '#00A9E0', textColor: '#FFFFFF' }, // Poco Blue
  { name: 'Infinix', brandColor: '#FF6800', textColor: '#000000' }, // Infinix Orange
  { name: 'Tecno', brandColor: '#1B76E4', textColor: '#FFFFFF' }, // Tecno Blue
  { name: 'Micromax', brandColor: '#000000', textColor: '#FFFFFF' }, // Micromax Black
  { name: 'Pixel', brandColor: '#4285F4', textColor: '#FFFFFF' }, // Google Blue
  { name: 'Sony', brandColor: '#000000', textColor: '#FFFFFF' }, // Sony Black
  { name: 'LG', brandColor: '#000000', textColor: '#FFFFFF' }, // LG Black
  { name: 'Lenovo', brandColor: '#000000', textColor: '#FFFFFF' }, // Lenovo Black
  { name: 'Honor', brandColor: '#1A93E2', textColor: '#FFFFFF' }, // Honor Blue
  { name: 'Gionee', brandColor: '#000000', textColor: '#FFFFFF' }, // Gionee Black
  { name: 'Karbonn', brandColor: '#0A75DB', textColor: '#FFFFFF' }, // Karbonn Blue
  { name: 'Panasonic', brandColor: '#000000', textColor: '#FFFFFF' }, // Panasonic Black
  { name: 'Lava', brandColor: '#E4002B', textColor: '#FFFFFF' }, // Lava Red
  { name: 'Others', brandColor: '#000000', textColor: '#FFFFFF' }, // Lenovo Black
];

const MobileBrandBar = () => {
  const elementRef = useRef(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const handleBrandClick = (brandName) => {
    setSelectedBrand(brandName);
    console.log(selectedBrand);
    elementRef.current.scrollLeft = 0;
  };

  return (
    <div
      className="p-2 flex flex-nowrap gap-2 overflow-x-scroll"
      ref={elementRef}
    >
      {selectedBrand && (
        <p
          className="text-center rounded-md shadow-md py-2 px-3 flex items-center select-none cursor-pointer tap-highlight-disable"
          style={{ backgroundColor: selectedBrand.brandColor }}
          onClick={() => handleBrandClick(selectedBrand.name)}
        >
          <span style={{ color: selectedBrand.textColor }}>
            {selectedBrand.name}
          </span>
        </p>
      )}
      {mobileBrands.map(
        (brand, index) =>
          brand.name !== selectedBrand && (
            <p
              key={index}
              className="text-center rounded-md shadow-md py-2 px-3 flex items-center select-none cursor-pointer tap-highlight-disable"
              onClick={() => handleBrandClick(brand)}
            >
              <span>{brand.name}</span>
            </p>
          )
      )}
    </div>
  );
};

export default MobileBrandBar;
