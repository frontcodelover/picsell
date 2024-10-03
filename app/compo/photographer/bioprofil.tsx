import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/initSupabase';
import Image from 'next/image';
import Link from 'next/link';
import Photos from './photos';
import useUserAndTranslation from '@/lib/hooks/useUserAndTranslation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface BioProfilProps {
  username: string;
  image_url: string;
  banner_url: string;
}

const BioProfil: React.FC<BioProfilProps> = ({ username }) => {
  const { t } = useUserAndTranslation();
  const [bio, setBio] = useState<string[]>([]);
  const [shortBio, setShortBio] = useState('');
  const [photographerName, setPhotographerName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [banner, setBanner] = useState('');
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer les informations du photographe
  const fetchPhotographerBio = async () => {
    try {
      // Récupérer les informations du photographe via user_id
      const { data: photographerData, error: photographerError } = await supabase
        .from('photographers')
        .select('bio, image_url, banner_url') // On sélectionne les colonnes 'bio', 'image_url' et 'banner_url'
        .eq('username', username)
        .single();

      if (photographerError || !photographerData) {
        console.error('Erreur de récupération du photographe :', photographerError);
        return;
      }

      const bio = photographerData.bio;
      const bioShort = bio.substring(0, 200) + (bio.length > 200 ? '...' : '');

      // Fonction pour couper la bio juste après un point
      const splitBioAtPeriod = (bio: string) => {
        const middle = Math.floor(bio.length / 2.5); // Trouve le milieu du texte
        const secondHalf = bio.slice(middle); // Deuxième moitié du texte

        // Trouver le premier point dans la deuxième moitié
        const firstPeriodIndex = secondHalf.indexOf('.');
        if (firstPeriodIndex === -1) {
          // Si aucun point n'est trouvé, on garde la séparation au milieu
          return [bio.slice(0, middle), bio.slice(middle)];
        }

        // Calculer l'index de coupure final
        const cutIndex = middle + firstPeriodIndex + 1; // Inclure le point dans la première moitié
        return [bio.slice(0, cutIndex), bio.slice(cutIndex)];
      };

      // Diviser la bio en deux parties
      const [firstHalf, secondHalf] = splitBioAtPeriod(bio);

      setBio([firstHalf, secondHalf]);
      setShortBio(bioShort);
      setPhotographerName(username);
      setAvatar(photographerData.image_url);
      setBanner(photographerData.banner_url);
      setLoading(false);
    } catch (error) {
      console.error('Erreur inconnue:', error);
    }
  };

  useEffect(() => {
    if (username) {
      fetchPhotographerBio();
    }
  }, [username]);

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <div>
      <img src={banner} alt='banner' className='w-full h-60 object-cover mb-6' />
      <section className='flex items-center justify-center flex-col gap-8 xl:w-10/12 max-w-full m-auto'>
        <div>
          <img src={avatar} alt={photographerName} className='object-cover max-w-40 rounded-full' />
        </div>
        <div>
          <h1 className='text-3xl font-extrabold'>{photographerName.toUpperCase()}</h1>
        </div>
        <div>
          <p className='text-lg text-center'>
            {shortBio}
            <span>
							<Link href={`/photographer/${username}/#longbio`} className='font-bold'> {t("photographerspage.readmore")}</Link>
            </span>
          </p>
        </div>
        <Photos />
				<Card  id='longbio'>
					<CardHeader className='text-xl uppercase font-extrabold ml-4 mb-[-25px]'>{t('photographerspage.about')}{photographerName}</CardHeader>
					<CardContent className="grid grid-cols-2 text-justify">
          {bio.map((chunk, index) => (
						<div key={index} className="p-4">
              {chunk}
            </div>
          ))}
					</CardContent>
        </Card>
      </section>
    </div>
  );
};

export default BioProfil;
