import React, { useState } from 'react';
import BioProfil from '@/components/photographer/bioprofil';
import { supabase } from '@/lib/initSupabase';
import { DisplayPageProps } from '@/types/DisplayPageProps';

const DisplayPage: React.FC<DisplayPageProps> = ({ username, bio, image_url, banner_url, user_id, photos }) => {
  const [currentBio, setCurrentBio] = useState(bio);
  // Fonction pour gérer la mise à jour de la bio après modification dans BioProfil
  const handleBioUpdate = (newBio: string) => {
    setCurrentBio(newBio);
  };

  return (
    <div>
      <BioProfil username={username} onBioUpdate={handleBioUpdate} />{' '}
      {/* <BioProfil username={username} bio_html={currentBio} image_url={image_url} banner_url={banner_url} user_id={user_id} photos={photos} onBioUpdate={handleBioUpdate} />{' '} */}
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { username } = context.params;
  console.log('username:', username);
  // Étape 1 : Récupérer les informations du photographe
  const { data: photographerData, error: photographerError } = await supabase.from('users').select('bio, avatar_url, id').eq('username', username).single();

  console.log('photographerData:', photographerData);

  if (photographerError || !photographerData) {
    return { notFound: true };
  }

  const user_id = photographerData.id; // Récupérer le user_id pour la vérification
  console.log('user_id:', user_id);

  // Étape 2 : Récupérer les photos associées à cet utilisateur
  const { data: photosData, error: photosError } = await supabase.from('photos').select('id, title, image_url, width, height, price').eq('photographer_id', user_id);

  if (photosError || !photosData) {
    return { notFound: true };
  }

  return {
    props: {
      username,
      bio_html: photographerData.bio || '',
      // image_url: photographerData.image_url,
      // banner_url: photographerData.banner_url,
      user_id, // Passer le user_id pour la vérification
      photos: photosData || [],
    },
  };
}

export default DisplayPage;
