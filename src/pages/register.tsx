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
import { AuthResponse } from '@supabase/supabase-js';

const Register = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setReady(true);
    }
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error }: AuthResponse = await supabase.auth.signUp({
      email,
      password,
    });

    // ajouter une methode qui mets à jour la table profiles avec l'user_id

    const { data: profile, error: profileError } = await supabase.from('profiles').insert({
      user_id: data?.user?.id,
      email: data?.user?.email,
		});
		
		// ajouter l'id de l'utilisateur dans le la table photographers dans user_id
		const { data: photographer, error: photographerError } = await supabase.from('photographers').insert({
			user_id: data?.user?.id,	
		});

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      return;
    }

    if (error) {
      setError(error.message); // Assurez-vous que vous extrayez le message d'erreur
    } else {
      const user = data?.user;
      console.log('Utilisateur inscrit:', user);
      if (user) {
        router.push('/profile/informations');
      }
    }
  };

  if (!ready) return null;

  return (
    <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[calc(800px-7rem)]'>
      <div className='flex items-center justify-center py-6'>
				<div className='mx-auto grid w-[350px] gap-6'>
				<div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>{t('createaccount')}</h1>
          </div>
          <form onSubmit={handleRegister} className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' type='email' placeholder='m@example.com' required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>{t('password')}</Label>
              <Input id='password' type='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type='submit' className='w-full'>
              {t('register')}
            </Button>
            {error && <p className='text-red-500'>{error}</p>} {/* Afficher l'erreur ici */}
          </form>
          <div className='mt-4 text-center text-sm'>
            <span>{t('alreadyaccount')}</span>
            <Link href='/login' className='underline text-secondary hover:text-secondary-foreground px-2'>
              {t('login')}
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

export default Register;
