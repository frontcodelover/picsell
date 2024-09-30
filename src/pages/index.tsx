import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import HomepageImg from '@/images/homepage.jpg';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import TextBox from '@/app/compo/homepage/TextBox';
import CarousselHome from '@/app/compo/caroussel/CarousselHome';
import CarousselProductHome from '@/app/compo/caroussel/CarousselProductHome';

export default function Home() {
  const { t } = useTranslation('common');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setReady(true);
    }
  }, []);

  if (!ready) return null;

  return (
    <>
      <div className='relative'>
        <Image src={HomepageImg} alt='homepage' className='h-[400px] w-screen object-cover' />
        <div className='absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50'>
          <h1 className='text-4xl font-extrabold'>{t('baseline')}</h1>
        </div>
      </div>
      <div className='m-auto w-6/12 py-6'>
        <h2 className='text-4xl font-extrabold text-center pb-3'>{t('brand')}</h2>
        <TextBox text={t('baseline two')} style='text-md font-bold text-center' />
      </div>
      <CarousselHome />
      <CarousselProductHome />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common'])),
  },
});
