import React from 'react';
import useUserAndTranslation from '@/lib/hooks/useUserAndTranslation';

const Photos = () => {
  const { t } = useUserAndTranslation();
  const artist = {
    name: 'Luc Dratwa',
    bio: `De par leur approche graphique, les créations visuelles de Luc Dratwa font preuve d’une rare expressivité, chargée d’émotion. Windows, sa série, montre le célèbre Empire State Building dans son élément : New York la trépidante.`,
    artworks: [
      {
        title: 'Windows III',
        imageUrl: 'https://dqqwbvtouglhiutfehvr.supabase.co/storage/v1/object/public/photos/public/1727948461278_L1160046-copie.jpg',
        size: '120 x 93 cm',
        price: '€599',
      },
      {
        title: 'Taking-Off, 17:21',
        imageUrl: 'https://dqqwbvtouglhiutfehvr.supabase.co/storage/v1/object/public/photos/public/1727996524552_DSC_2475-Avec-accentuation-NR-copie.jpg',
        size: '121 x 94 cm',
        price: '€649',
      },
      {
        title: 'Taking-Off, 17:21',
        imageUrl: 'https://dqqwbvtouglhiutfehvr.supabase.co/storage/v1/object/public/photos/public/1727996544250_L1140289-copie.jpg',
        size: '121 x 94 cm',
        price: '€649',
      },
      {
        title: 'Taking-Off, 17:21',
        imageUrl: 'https://dqqwbvtouglhiutfehvr.supabase.co/storage/v1/object/public/photos/public/1727996579884_L1181619-copie.jpg',
        size: '121 x 94 cm',
        price: '€649',
      },
      {
        title: 'Taking-Off, 17:21',
        imageUrl: 'https://dqqwbvtouglhiutfehvr.supabase.co/storage/v1/object/public/photos/public/1727996595065_L1211118-1-copie.jpg',
        size: '121 x 94 cm',
        price: '€649',
      },
      // Ajoute d'autres œuvres d'art ici
    ],
  };

  return (
    <>
      <h2 className='text-2xl uppercase font-extrabold py-4'>{t('photographerspage.availableworks')}</h2>
      <div className='w-full m-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-Z lg:grid-cols-3 gap-6'>
          {artist.artworks.map((artwork, index) => (
            <div key={index} className=' rounded-lg p-4 transition duration-300'>
              <div className='m-auto flex justify-center w-full pb-4'>
                <div className=' border-black border-8 shadow-lg'>
                  <img src={artwork.imageUrl} alt={artwork.title} className='h-64 object-contain p-4 hover:grayscale hover:blur-sm transition duration-700' />
                </div>
              </div>
              <h3 className='text-xl font-medium text-gray-900 mb-2'>{artwork.title}</h3>
              <p className='text-gray-500'>Dimensions : {artwork.size}</p>
              <p className='text-gray-500 mb-4'>Prix : {artwork.price}</p>
              <button className='w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300'>Ajouter au panier</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Photos;
