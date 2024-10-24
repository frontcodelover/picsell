import React from 'react';
import useUserAndTranslation from '@/hooks/useUserAndTranslation';
import { Photo } from '@/types/photographers';
import AddPhotos from './addPhotos';
import Link from 'next/link';
import { User } from '@/types/user';
import Image from 'next/image';
import { Title } from '@/components/ui/title';

const Photos = ({ photos, user }: { photos: Photo[]; user: User }) => {
  const { t } = useUserAndTranslation();

  return (
		<>
			<div className='flex justify-start w-full'>
      <Title text={t('photographerspage.availableworks')} size='4xl' />
      </div>
				<div className='w-full m-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-4 gap-6'>
          {photos?.map((photo) => (
            <div key={photo.id} className='rounded-lg transition duration-300'>
              <div className='m-auto flex justify-center w-full pb-2'>
              
                  <Link href={`/photo/${photo.slug}`}>
                    <Image src={photo.image_url} alt={photo.title} width={1000} height={0} className='min-h-80 object-contain hover:grayscale hover:blur-sm transition duration-700' />
                  </Link>
               
              </div>
              <Link href={`/photo/${photo.slug}`}>
                <h3 className='text-md font-bold tracking-[-.075em]'>{photo.title}</h3>
              </Link>
              <div className='text-sm pb-2 tracking-tighter'>by {user.username}</div>
              <p className='text-md font-semibold tracking-tighter'>A partir de {photo.price} €</p>
            </div>
          ))}
          {user && <AddPhotos user={user} />}
        </div>
      </div>
    </>
  );
};

export default Photos;
