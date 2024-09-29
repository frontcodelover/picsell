import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import picsellLogin from '@/images/picsellerLogin.jpg';
import { useTranslation } from 'react-i18next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';

const Login = () => {
  const { t, i18n } = useTranslation('common'); // 'common' fait référence à common.json

  const [ready, setReady] = useState(false); // Ajout d'un état pour retarder le rendu

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setReady(true); // Indiquer que le composant est prêt à rendre côté client
    }
  }, []);

  if (!ready) return null;

  return (
    <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[calc(800px-7rem)]'>
      <div className='flex items-center justify-center py-6'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>{t('login')}</h1>
            <p className='text-balance text-muted-foreground'>{t('enter your email below to login to your account')}</p>
          </div>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' type='email' placeholder='m@example.com' required />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>{t('password')}</Label>
                <Link href='/forgot-password' className='ml-auto inline-block text-sm underline'>
                  {t('forgot your password?')}
                </Link>
              </div>
              <Input id='password' type='password' required />
            </div>
            <Button type='submit' className='w-full'>
              {t('login')}
            </Button>
            <Button variant='outline' className='w-full'>
              {t('login with Google')}
            </Button>
          </div>
          <div className='mt-4 text-center text-sm'>
            <span>{t('don’t have an account?')}</span>
            <Link href='#' className='underline'>
              {t('sign up')}
            </Link>
          </div>
        </div>
      </div>
      <div className='hidden lg:block'>
        <Image src={picsellLogin} alt='Image' width='1920' height='800' className='h-full pt-9 w-screen object-cover' />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'fr', ['common'])),
    },
  };
};

export default Login;
