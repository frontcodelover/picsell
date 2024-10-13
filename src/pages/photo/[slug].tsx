import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/initSupabase';
import Single from '@/components/photo/single';

const PhotoSlug = () => {
  const { query: { slug } } = useRouter();
  const [photoData, setPhotoData] = useState({ photo: null, photographer: null });

  useEffect(() => {
    const fetchData = async () => {
      if (!slug || typeof slug !== 'string') return;

      try {
        const { data: photos, error: photoError } = await supabase
          .from('photos')
          .select('*')
          .eq('slug', slug)
          .single();

        if (photoError || !photos) {
          console.error('Erreur lors de la récupération des photos ou aucune photo trouvée');
          return;
        }

        const { data: photographer, error: photographerError } = await supabase
          .from('users')
          .select('username')
          .eq('id', photos.photographer_id)
          .single();

        if (photographerError) {
          console.error('Erreur lors de la récupération du photographe');
        }

        setPhotoData({ photo: photos, photographer });
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <div className='w-10/12 mx-auto mt-10'>
      <Single photo={photoData.photo} photographer={photoData.photographer} />
    </div>
  );
};

export default PhotoSlug;
