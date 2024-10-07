import React, { useState } from 'react';
import BioProfil from '@/components/photographer/bioprofil';
import { supabase } from '@/lib/initSupabase';

interface DisplayPageProps {
  username: string;
  bio_html: string;
  image_url: string;
  banner_url: string;
  user_id: string; // Ajouter user_id dans les props
  onBioUpdate: (newBio: string) => void; // Ajouter une fonction pour mettre à jour la bio
  photos: {
    id: number;
    title: string;
    image_url: string;
    width: number;
    height: number;
    prix: number;
  }[];
}

const DisplayPage: React.FC<DisplayPageProps> = ({ username, bio_html, image_url, banner_url, user_id, photos }) => {
  const [currentBio, setCurrentBio] = useState(bio_html);

  // Fonction pour gérer la mise à jour de la bio après modification dans BioProfil
  const handleBioUpdate = (newBio: string) => {
    setCurrentBio(newBio); // Met à jour l'état local
  };

  return (
    <div>
      <BioProfil username={username} bio_html={currentBio} image_url={image_url} banner_url={banner_url} user_id={user_id} photos={photos} onBioUpdate={handleBioUpdate} />
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { username } = context.params;

  // Étape 1 : Récupérer les informations du photographe
  const { data: photographerData, error: photographerError } = await supabase.from('photographers').select('bio_html, image_url, banner_url, user_id').eq('username', username).single();

  if (photographerError || !photographerData) {
    return { notFound: true };
  }

  const user_id = photographerData.user_id; // Récupérer le user_id pour la vérification

  // Étape 2 : Récupérer les photos associées à cet utilisateur
  const { data: photosData, error: photosError } = await supabase.from('photos').select('id, title, image_url, width, height, prix').eq('user_id', user_id);

  if (photosError || !photosData) {
    return { notFound: true };
  }

  return {
    props: {
      username,
      bio_html: photographerData.bio_html || '',
      image_url: photographerData.image_url,
      banner_url: photographerData.banner_url,
      user_id, // Passer le user_id pour la vérification
      photos: photosData || [],
    },
  };
}

export default DisplayPage;
