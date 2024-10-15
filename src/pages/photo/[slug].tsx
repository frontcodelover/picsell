import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/initSupabase';
import Single from '@/components/photo/single';
import { Photo } from '@/types/photographers';
import { User } from '@/types/user';

const PhotoSlug = () => {
  const {
    query: { slug },
  } = useRouter();
  
  // Utilisation de `photo` et `photographer` pour correspondre à l'utilisation plus bas
  const [photoData, setPhotoData] = useState<{ photo: Photo | null, photographer: User | null }>({ photo: null, photographer: null });

  useEffect(() => {
    const fetchData = async () => {
      if (!slug || typeof slug !== 'string') return;

      try {
        // Fetch des photos
        const { data: photo, error: photoError } = await supabase.from('photos').select('*').eq('slug', slug).single();

        if (photoError || !photo) {
          console.error('Erreur lors de la récupération des photos ou aucune photo trouvée');
          return;
        }

        // Fetch du photographe
        const { data: photographer, error: photographerError } = await supabase.from('users').select('id, username, bio').eq('id', photo.photographer_id).single();

        if (photographerError) {
          console.error('Erreur lors de la récupération du photographe');
        }

        // Mise à jour de l'état avec les bons noms de propriétés
        setPhotoData({ photo, photographer });
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <div className='w-10/12 mx-auto mt-10'>
      {/* Passer `photoData.photo` et `photoData.photographer` correctement au composant Single */}
      {photoData.photo && photoData.photographer && (
        <Single photo={photoData.photo} photographer={photoData.photographer} />
      )}
    </div>
  );
};

export default PhotoSlug;
