import React from 'react';
import useUserAndTranslation from '@/hooks/useUserAndTranslation';
import { Photo } from '@/types/photographers';
import AddPhotos from './addPhotos';
import Image from 'next/image';
import Link from 'next/link';
import { User } from '@/types/user';

const Photos = ({ photos, user }: { photos: Photo[]; user: User }) => {
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
                  <Link href={`/photo/${photo.slug}`}>
                    <img src={photo.image_url} alt={photo.title} className='h-64 object-contain p-4 hover:grayscale hover:blur-sm transition duration-700' />
                  </Link>
                </div>
              </div>
              <Link href={`/photo/${photo.slug}`}>
                <h3 className='text-md font-bold text-secondary'>{photo.title}</h3>
              </Link>
                <div className='text-sm pb-2 text-secondary'>{user.username}</div>
              <p className='text-md font-semibold text-secondary'>A partir de {photo.price} €</p>
            </div>
          ))}
          {user && <AddPhotos user={user} />}
        </div>
      </div>
    </>
  );
};

export default Photos;
