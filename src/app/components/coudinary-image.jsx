'use client';

import { CldImage } from 'next-cloudinary';

export const CloudinaryImage = ({
  src,
  width,
  height,
  alt,
  className,
  sizes,
}) => {
  return (
    <CldImage
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={className}
      sizes={sizes}
    />
  );
};
