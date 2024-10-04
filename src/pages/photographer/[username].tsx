import React from 'react';
import BioProfil from '@/app/compo/photographer/bioprofil';
import Photos from '@/app/compo/photographer/photos';
import { supabase } from '@/lib/initSupabase';

interface DisplayPageProps {
  username: string;
  bio: string;
  image_url: string;
  banner_url: string;
  photos: {
    id: number;
    title: string;
    image_url: string;
    width: number;
    height: number;
    prix: number;
  }[];
}

const DisplayPage: React.FC<DisplayPageProps> = ({ username, bio, image_url, banner_url, photos }) => {
  return (
    <div>
      {/* Composant pour afficher le profil du photographe */}
			<BioProfil username={username} bio={bio} image_url={image_url} banner_url={banner_url} photos={photos} />

      {/* Composant pour afficher les photos du photographe */}
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { username } = context.params;

  // Étape 1 : Récupérer les informations du photographe
  const { data: photographerData, error: photographerError } = await supabase
    .from('photographers')
    .select('bio, image_url, banner_url, user_id')
    .eq('username', username)
    .single();

  if (photographerError || !photographerData) {
    return { notFound: true };
  }

  const user_id = photographerData.user_id; // On récupère le user_id pour les photos

  // Étape 2 : Récupérer les photos associées à cet utilisateur
  const { data: photosData, error: photosError } = await supabase
    .from('photos')
    .select('id, title, image_url, width, height, prix')
    .eq('user_id', user_id);

  if (photosError || !photosData) {
    return { notFound: true };
  }

  return {
    props: {
      username, // On passe le username pour le profil
      bio: photographerData.bio || '',
      image_url: photographerData.image_url,
      banner_url: photographerData.banner_url,
      photos: photosData || [], // On passe les photos récupérées
    },
  };
}

export default DisplayPage;
