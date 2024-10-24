import React, { useState, useEffect } from 'react';
import useUserAndTranslation from '@/hooks/useUserAndTranslation'; // Importer le hook pour l'utilisateur et les traductions
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import BioSplit from './bioSplit';
import { User } from '@/types/user';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';
import { Button } from '../ui/button';
import { supabase } from '@/lib/initSupabase';
import Photos from './photos';
import { Photo } from '@/types/photographers';
import { LuQuote } from 'react-icons/lu';

const BioProfil = ({ user }: { user: User }) => {
  const { t } = useUserAndTranslation();
  const authUser = useUser();
  const [profilePic] = useState(user?.avatar_url);
  const [bannerPic] = useState(user?.banner_url);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null as string | null);

  const bioshorted = user.bio ? user?.bio?.substring(0, 200) + (user?.bio?.length > 210 ? '...' : '') : t('photographerspage.nobio');

  const username = user.username;

  useEffect(() => {
    const fetchPhotosByUsername = async () => {
      if (!username) return; // S'assure que l'username est bien chargé
      try {
        setLoading(true);

        // Étape 1: Récupérer l'utilisateur à partir de son username
        const { data: user, error: userError } = await supabase.from('users').select('id').eq('username', username).single(); // On s'attend à un seul utilisateur

        if (userError) {
          throw new Error('Utilisateur non trouvé');
        }

        const photographerId = user.id;

        // Étape 2: Récupérer les photos associées à cet utilisateur
        const { data: photosData, error: photosError } = await supabase.from('photos').select('*').eq('photographer_id', photographerId);

        if (photosError) {
          throw new Error('Erreur lors de la récupération des photos');
        }

        // Mise à jour de l'état des photos
        setPhotos(photosData);
      } catch (error) {
        console.error(error);

        // Vérification si l'erreur est une instance de Error
        if (error instanceof Error) {
          setError(error.message); // Maintenant TypeScript sait que error a une propriété message
        } else {
          setError("Une erreur inconnue s'est produite"); // Cas de fallback si ce n'est pas une instance de Error
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPhotosByUsername();
  }, [username]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div>
      <section className='flex items-center justify-center flex-col gap-8 xl:w-10/12 max-w-full m-auto'>
        <div className='bg-black w-screen text-white flex justify-center flex-col py-10 min-h-60'>
          <h1 className='w-10/12 m-auto text-3xl tracking-[.050em] uppercase'>{user?.username}</h1>
          {authUser?.id === user?.id && (
            <div className='py-4 w-10/12 m-auto'>
              <Link href={`/photographe/${user.username}/edit`}>
                <Button> {t('photographerspage.edit')}</Button>
              </Link>
            </div>
          )}
        </div>

        <div className='flex h-full'>
          <div className='flex items-start'>
            <LuQuote className='text-4xl text-black rotate-180' />
          </div>
          <div className='flex items-end'>
            <div dangerouslySetInnerHTML={{ __html: bioshorted }} className='tracking-[-.075em] italic text-2xl w-[90%]'></div>
            <Link href='#longbio' className='text-md underline'>
              {t('photographerspage.readmore')}
            </Link>
          </div>
        </div>

        <Photos photos={photos} user={user} />

        <Card id='longbio' className='w-full'>
          <CardHeader className='text-xl uppercase font-extrabold ml-4 mb-[-25px]'>
            {t('photographerspage.about')} {user?.username}
          </CardHeader>
          <CardContent className='w-full'>
            <BioSplit user={user} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default BioProfil;
