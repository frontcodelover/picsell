import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/initSupabase';
import Image from 'next/image';

interface BioProfilProps {
  username: string;
	image_url: string;
	banner_url: string;
}

const BioProfil: React.FC<BioProfilProps> = ({ username }) => {
  // On récupère l'username depuis l'URL
  const [bio, setBio] = useState('');
  const [photographerName, setPhotographerName] = useState('');
	const [avatar, setAvatar] = useState('');
	const [banner, setBanner] = useState('')
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

      setBio(photographerData.bio);
      setPhotographerName(username);
			setAvatar(photographerData.image_url);
			setBanner(photographerData.banner_url)
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
			<img src={banner} alt="banner" className='w-full h-60 object-cover mb-6' />
      <section className='flex items-center justify-center flex-col gap-6'>
        <div>
          <img src={avatar} alt={photographerName} className='object-cover max-w-40 rounded-full' />
        </div>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>{photographerName}</h1>
        </div>
        <div>
          <p className='text-gray-600'>{bio}</p>
        </div>
      </section>
    </div>
  );
};

export default BioProfil;
