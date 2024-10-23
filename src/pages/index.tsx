import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import TextBox from '@/components/homepage/TextBox';
import CarousselHome from '@/components/caroussel/CarousselHome';
import useUserAndTranslation from '@/hooks/useUserAndTranslation';
import { ImageBoxAndText } from '@/components/homepage/imageBoxAndText';
import placeholder from '@/images/placeholder.jpg';
import { Title } from '@/components/ui/title';
import { Hero } from '@/components/homepage/hero';
import { Subtitle } from '@/components/ui/subtitle';
import Tokyo from '@/images/tokyo.jpg';
import Kyoto from '@/images/kyoto.jpg';
import Fujisan from '@/images/fujisan.jpg';
import Hanoi from '@/images/hanoi.jpg';
import { HightPhotos } from '@/components/homepage/hightPhotos';

export default function Home() {
  const { t, ready } = useUserAndTranslation();

  if (!ready) return null;

  return (
    <>
      <Hero />

      <div className='m-auto py-6 flex flex-col'>
        <div className='w-10/12 m-auto'>
          <div className='flex flex-col mb-8'>
            <Title text={"Notre sélection d'oeuvres d'art"} size={'4xl'} />
            <Subtitle text={"Découvrez les oeuvres d'artiste du moment"} size={'text-xl'} />
          </div>
          <div className='flex items-center justify-between gap-8'>
            <div className='grid grid-cols-2 gap-5'>
              <HightPhotos title='Kyoto' author='Nicolas Lucien Jean' photo={Kyoto} />
              <HightPhotos title='Tokyo' author='Nicolas Lucien Jean' photo={Tokyo} />
              <HightPhotos title='Hanoi' author='Nicolas Lucien Jean' photo={Hanoi} />
              <HightPhotos title='Fujisan' author='Nicolas Lucien Jean' photo={Fujisan} />
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-center gap-8 bg-black text-white pt-8 pb-20 my-8'>
          <div className='w-10/12 m-auto flex flex-col gap-8'>
            <Title text={'Artiste du moment'} size={'4xl'} />
            <ImageBoxAndText
              text={
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem esse enim dolor nulla eius autem cupiditate magni ratione error eum! Sunt adipisci voluptas consequuntur rem nulla magni excepturi molestias dicta?'
              }
              image={placeholder}
            />
          </div>
        </div>
        <div>
          <div className='w-10/12 m-auto flex flex-col gap-8'>
            <Title text={'Trouvez votre univers'} size={'4xl'} />
            <div className='flex justify-center gap-8'>
              <CarousselHome />
            </div>
            <TextBox text={t('baseline two')} style='text-xl text-center w-2/3 m-auto py-8' />
          </div>
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
