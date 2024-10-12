import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/initSupabase';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PhotoSlug = () => {
  const router = useRouter();
  const { slug } = router.query; // slug peut être undefined au début
  const [photo, setPhoto] = useState<any>(null);
  const [photographer, setPhotographer] = useState<any>(null);

  useEffect(() => {
    const getPhotosBySlug = async () => {
      if (!slug || typeof slug !== 'string') return;

      try {
        const { data: photos, error } = await supabase
          .from('photos')
          .select('*')
          .eq('slug', slug);

        if (error) {
          throw new Error('Erreur lors de la récupération des photos');
        }

        if (photos && photos.length > 0) {
          setPhoto(photos[0]); // On prend la première photo si elle existe
        } else {
          console.log('Aucune photo trouvée pour ce slug');
        }
      } catch (error) {
        console.error('Erreur pendant la récupération des photos :', error);
      }
    };

    const fetchPhotographerID = async () => {
      if (!photo) return;
      try {
        const { data: photographer, error } = await supabase
          .from('users')
          .select('username')
          .eq('id', photo.photographer_id)
          .single();
        if (error) {
          throw new Error('Erreur lors de la récupération du photographe');
        }
        setPhotographer(photographer);
      } catch (error) {
        console.error('Erreur pendant la récupération du photographe :', error);
      }
    };

    getPhotosBySlug();
    fetchPhotographerID();
  }, [slug, photo]);

  return (
    <div className='w-10/12 mx-auto mt-10'>
      {photo ? (
        <div className='grid md:grid-cols-2 md:grid-flow-col gap-6'>
          {/* Section Image */}
          <div>
            <Image 
              src={photo.image_url} 
              alt={photo.title} 
              width={500} 
              height={600} 
              className='rounded-md shadow-lg'
            />
          </div>

          {/* Section Détails */}
          <Card className='p-4'>
            <div className='bg-black text-primary p-2 mb-4 font-bold text-center'>
              Edition limitée à {photo.number} exemplaires
            </div>
            <h1 className='font-extrabold text-3xl uppercase mb-4'>{photo.title}</h1>
            <div className='font-bold mb-2'>Artiste : {photographer?.username || 'Inconnu'}</div>
            <div className='text-lg font-extrabold pt-6 uppercase'>Description</div>
            <div className='italic'>" {photo.description} "</div>

            {/* Informations additionnelles */}
            <div className='font-semibold text-lg my-4'>Prix : €{photo.price}</div>

            {/* Formats disponibles */}
            <div className='font-extrabold text-lg uppercase'>Formats disponibles :</div>
            {photo.format && Object.values(photo.format).map((format: string, index: number) => (
              <div key={index} className='font-semibold text-lg mb-2'>Dimensions : {format}</div>
            ))}

            {/* Délai et méthode d'envoi */}
            <div className='font-semibold text-lg mt-4'>Délai de livraison : {photo.shipping_delay} jours</div>
            <div className='font-semibold text-lg'>Méthode d'envoi : {photo.shipping_method}</div>

            {/* Bouton Ajouter au Panier */}
            <Button className='mt-6 font-extrabold p-4 rounded-md transition duration-300'>
              Ajouter au panier
            </Button>
          </Card>
        </div>
      ) : (
        <p>Chargement ou aucune photo trouvée...</p>
      )}
    </div>
  );
};

export default PhotoSlug;
