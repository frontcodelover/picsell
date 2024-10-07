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
import { supabase } from '@/lib/initSupabase';
import { useRouter } from 'next/router';
import UseUserAndTranslation from '@/hooks/useUserAndTranslation';

const Login = () => {
  type LoginType = {
    email: string;
    password: string;
  };

  const { t, ready } = UseUserAndTranslation(); // 'common' fait référence à common.json
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message); // Enregistre le message d'erreur
    } else {
      const user = data?.user; // Accédez à l'utilisateur à partir de `data`
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('currentUserId', user.id);
      // Rediriger l'utilisateur vers la page d'accueil
      if (user) {
        router.push('/profile/informations'); // Redirige vers la page d'accueil
      }
    }
  };

  if (!ready) return null;

  return (
    <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[calc(800px-7rem)]'>
      <div className='flex items-center justify-center py-6'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>{t('login')}</h1>
            <p className='text-balance text-muted-foreground'>{t('enter your email below to login to your account')}</p>
          </div>
          <form onSubmit={handleLogin} className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' type='email' placeholder='m@example.com' required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>{t('password')}</Label>
                <Link href='/forgot-password' className='ml-auto inline-block text-sm underline text-secondary hover:text-secondary-foreground'>
                  {t('forgot your password?')}
                </Link>
              </div>
              <Input id='password' type='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type='submit' className='w-full'>
              {t('login')}
            </Button>
            {error && <p className='text-red-500'>{error}</p>} {/* Afficher l'erreur ici */}
            <Button variant='secondary' className='w-full'>
              {t('login with Google')}
            </Button>
          </form>
          <div className='mt-4 text-center text-sm'>
            <span>{t('don’t have an account?')}</span>
            <Link href='/register' className='underline text-secondary hover:text-secondary-foreground'>
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
