import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import HomepageImg from '@/images/homepage.jpg';
import TextBox from '@/components/homepage/TextBox';
import CarousselHome from '@/components/caroussel/CarousselHome';
import useUserAndTranslation from '@/hooks/useUserAndTranslation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ImageBoxAndText } from '@/components/homepage/imageBoxAndText';
import placeholder from '@/images/placeholder.jpg';
import { Title } from '@/components/ui/title';

export default function Home() {
  const { t, ready } = useUserAndTranslation();

  if (!ready) return null;

  return (
    <>
      <div className='relative'>
        <Image src={HomepageImg} alt='homepage' className='h-screen w-screen object-cover' />
        <div className='absolute inset-0 flex flex-col justify-end text-white bg-black bg-opacity-50'>
          <h1 className='text-4xl font-light mb-6 ml-10'>{t('baseline')}</h1>
          <Link href='/products' passHref>
            <Button className='flex ml-10 mb-40 mt-2 w-fit text-lg font-normal p-6 rounded-3xl bg-white'>Découvrir le projet.</Button>
          </Link>
        </div>
      </div>

      <div className='m-auto w-10/12 py-6 flex flex-col gap-8'>
        <Title text={'Notre sélection'} size={'4xl'} />
        <div className='flex items-center justify-between gap-8'>
					<div className='flex flex-col gap-8'>
					<Image src={placeholder} alt='homepage' className='h-full object-cover rounded-lg' />
          <Image src={placeholder} alt='homepage' className='h-full object-cover rounded-lg' />
				 </div>
					<div className='flex flex-col gap-8'>
					<Image src={placeholder} alt='homepage' className='h-full object-cover rounded-lg' />
          <Image src={placeholder} alt='homepage' className='h-full object-cover rounded-lg' />
				 </div>
        </div>

        <div className='flex flex-col justify-center gap-8'>
          <Title text={'Artiste du moment'} size={'4xl'} />
          <ImageBoxAndText
            text={
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem esse enim dolor nulla eius autem cupiditate magni ratione error eum! Sunt adipisci voluptas consequuntur rem nulla magni excepturi molestias dicta?'
            }
            image={placeholder}
          />
          <Title text={'Trouvez votre univers'} size={'4xl'} />
          <div className='flex justify-center'>
            <CarousselHome />
          </div>
          <TextBox text={t('baseline two')} style='text-xl text-center w-2/3 m-auto py-8' />
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common'])),
  },
});
