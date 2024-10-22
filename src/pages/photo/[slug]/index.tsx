import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { supabase } from '@/lib/initSupabase';
import Single from '@/components/photo/single';
import { Photo } from '@/types/photographers';
import { User } from '@/types/user';

interface PhotoPageProps {
  photo: Photo;
  photographer: User;
}

// Ce composant utilise des props statiques
const PhotoSlug = ({ photo, photographer }: PhotoPageProps) => {
  return <div className='w-10/12 mx-auto mt-10'>{photo && photographer && <Single photo={photo} photographer={photographer} />}</div>;
};

export default PhotoSlug;

// Récupère les chemins dynamiques pour tous les slugs
export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch tous les slugs depuis la base de données
  const { data: photos } = await supabase.from('photos').select('slug');

  const paths =
    photos?.map((photo) => ({
      params: { slug: photo.slug }, // Structure correcte pour les chemins
    })) || [];

  return {
    paths,
    fallback: 'blocking', // Génère les pages dynamiquement si elles n'existent pas encore
  };
};

// Récupère les données pour une page en fonction du slug
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string }; // Destructuration correcte ici

  // Fetch des photos depuis la base de données
  const { data: photo, error: photoError } = await supabase.from('photos').select('*').eq('slug', slug).single();

  if (photoError || !photo) {
    return { notFound: true };
  }

  // Fetch du photographe lié à la photo
  const { data: photographer, error: photographerError } = await supabase.from('users').select('id, username, bio').eq('id', photo.photographer_id).single();

  if (photographerError || !photographer) {
    return { notFound: true };
  }

  return {
    props: {
      photo,
      photographer,
    },
    revalidate: 10, // Permet de re-générer la page toutes les 10 secondes si les données changent
  };
};
