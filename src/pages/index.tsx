import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import HomepageImg from '@/images/homepage.jpg';
import TextBox from '@/components/homepage/TextBox';
import CarousselHome from '@/components/caroussel/CarousselHome';
import CarousselProductHome from '@/components/caroussel/CarousselProductHome';
import useUserAndTranslation from '@/hooks/useUserAndTranslation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const { t, ready } = useUserAndTranslation();

  if (!ready) return null;

  return (
    <main className='bg-muted'>
      <div className='relative'>
        <Image src={HomepageImg} alt='homepage' className='h-screen w-screen object-cover' />
        <div className='absolute inset-0 flex flex-col justify-end text-white bg-black bg-opacity-50'>
          <h1 className='text-4xl font-light mb-6 ml-10'>{t('baseline')}</h1>
          <Link href='/products' passHref>
            <Button className='flex ml-10 mb-40 mt-2 w-fit text-lg font-normal p-6 rounded-3xl bg-white'>
              Découvrir le projet
            </Button>
          </Link>
        </div>
      </div>
      <div className='m-auto w-6/12 py-6'>
        <h2 className='text-4xl font-extrabold text-center pb-3'>{t('brand')}</h2>
        <TextBox text={t('baseline two')} style='text-md font-bold text-center' />
      </div>
      <CarousselHome />
      <CarousselProductHome />
    </main>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common'])),
  },
});
