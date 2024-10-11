import React from 'react';
import useUserAndTranslation from '@/hooks/useUserAndTranslation';
import { Photo } from '@/types/photographers';
import { PhotosProps } from '@/types/photographers';

const Photos: React.FC<PhotosProps> = ({ photos }) => {
  const { t } = useUserAndTranslation();

  return (
    <>
      <h2 className='text-2xl uppercase font-extrabold py-4'>{t('photographerspage.availableworks')}</h2>
      <div className='w-full m-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {photos?.map((photo) => (
            <div key={photo.id} className='rounded-lg p-4 transition duration-300'>
              <div className='m-auto flex justify-center w-full pb-4'>
                <div className='border-black border-8 shadow-lg'>
                  <img src={photo.image_url} alt={photo.title} className='h-64 object-contain p-4 hover:grayscale hover:blur-sm transition duration-700' />
                </div>
              </div>
              <h3 className='text-xl font-medium text-gray-900 mb-2'>{photo.title}</h3>
              <p className='text-gray-500'>
                Dimensions : {photo.width} x {photo.height} cm
              </p>
              <p className='text-gray-500 mb-4'>Prix : €{photo.price}</p>
              <button className='w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300'>Ajouter au panier</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Photos;
