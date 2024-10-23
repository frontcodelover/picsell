import React from 'react';
import useUserAndTranslation from '@/hooks/useUserAndTranslation';
import Image from 'next/image';
import HomepageImg from '@/images/homepage.jpg';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  const { t } = useUserAndTranslation();
  return (
    <div className='relative'>
      <Image src={HomepageImg} alt='homepage' className='h-screen w-screen object-cover' />
      <div className='absolute inset-0 text-black bg-black bg-opacity-10'>
        <div className='flex items-center h-screen'>
          <div className='bg-white/80 w-[40%] py-14 ml-20 flex flex-col gap-8 backdrop-blur-2xl drop-shadow-xl rounded-xl'>
            <h1 className='text-4xl ml-10 tracking-[-.075em] text-balance font-extrabold'>
              <span className='text-primary'>{t('baseline')}</span> {t('baseline2')}
            </h1>
            <div className='ml-10 tracking-tighter'>{t('promess')}</div>
            <Link href='/products' passHref>
              <Button className='flex ml-10 mt-2 w-fit text-lg font-normal bg-black text-white hover:bg-accent hover:text-black tracking-tighter border-2 border-black'>Découvrir le projet</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
