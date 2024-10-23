import React from 'react';
import Image, { StaticImageData } from 'next/image';

type HightPhotosProps = {
  title: string;
  author: string;
  photo: StaticImageData;
};

export const HightPhotos = ({ title, author, photo }: HightPhotosProps) => {
  return (
    <div className='relative rounded-xl overflow-hidden'>
      <div className='absolute p-10 text-white tracking-tighter w-full h-full bg-gradient-to-t from-black/40 to-black/0 rounded-xl'>
        <div className='absolute bottom-6'>
          <p className='text-2xl font-semibold'>{title}</p>
          <p className=''>by {author}</p>
        </div>
      </div>
      <Image src={photo} alt='homepage' className='h-full object-cover' /> 
    </div>
  );
};

