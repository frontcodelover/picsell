import React from 'react';
import Image, { StaticImageData } from 'next/image';

type ImageBoxAndTextProps = {
  image: string | StaticImageData;
  text: string;
};

export const ImageBoxAndText = ({ image, text }: ImageBoxAndTextProps) => {
  return (
    <>
      <div>{text}</div>
      <div className='flex justify-center h-full'>
        <div className='flex gap-1 w-full justify-center'>
          <div className='w-[20%]'>
            <Image src={image} alt='Product Image' className='object-cover rounded-lg' />
          </div>
          <div className='w-[20%]'>
            <Image src={image} alt='Product Image' className='object-cover max-h-[300px] w-full h-full rounded-lg' />
          </div>
          <div className='w-[20%]'>
            <Image src={image} alt='Product Image' className='object-cover max-h-[300px] w-full h-full rounded-lg' />
          </div>
          <div className='w-[20%]'>
            <Image src={image} alt='Product Image' className='object-cover max-h-[300px] w-full h-full rounded-lg' />
          </div>
          <div className='w-[20%]'>
            <Image src={image} alt='Product Image' className='object-cover max-h-[300px] w-full h-full rounded-lg' />
          </div>
        </div>
      </div>
    </>
  );
};
