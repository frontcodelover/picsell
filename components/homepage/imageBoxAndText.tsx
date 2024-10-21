import React from 'react';
import Image, { StaticImageData } from 'next/image';

type ImageBoxAndTextProps = {
  image: string | StaticImageData;
  text: string;
};

export const ImageBoxAndText = ({ image, text }: ImageBoxAndTextProps) => {
  return (
    <div className='flex gap-8'>
      <div className='w-[33%]'>
        <Image src={image} alt='Product Image' width={600} height={600} className='aspect-square object-cover w-full h-60 rounded-lg' />
      </div>
      <div className='w-[66%]'>
        <h3 className='text-lg md:text-lg'>{text}</h3>
      </div>
    </div>
  );
};
