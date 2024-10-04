import React from 'react';
import Link from 'next/link';
import Photos from './photos';
import useUserAndTranslation from '@/lib/hooks/useUserAndTranslation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface BioProfilProps {
  username: string;
  image_url: string;
  banner_url: string;
  bio: string;
  photos: any[]; // Adjust the type of photos as needed
}

const BioProfil: React.FC<BioProfilProps> = ({ username, image_url, banner_url, bio, photos }) => {
  const { t } = useUserAndTranslation();

  const shortBio = bio ? bio.substring(0, 200) + (bio.length > 200 ? '...' : '') : '';

  const splitBioAtPeriod = (bio: string | undefined) => {
    if (!bio) return ['', ''];
    const middle = Math.floor(bio.length / 2.5);
    const secondHalf = bio.slice(middle);
    const firstPeriodIndex = secondHalf.indexOf('.');
    if (firstPeriodIndex === -1) return [bio.slice(0, middle), bio.slice(middle)];
    const cutIndex = middle + firstPeriodIndex + 1;
    return [bio.slice(0, cutIndex), bio.slice(cutIndex)];
  };

  const [firstHalf, secondHalf] = splitBioAtPeriod(bio);

  // Fonction pour gérer le scroll smooth avec Link de Next.js
  const handleSmoothScroll = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Empêche le comportement de base du lien
    const section = document.querySelector('#longbio'); // Sélectionne la section
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' }); // Scroll lissé
    }
  };

  return (
    <div>
      <img src={banner_url} alt='banner' className='w-full h-60 object-cover mb-6' />
      <section className='flex items-center justify-center flex-col gap-8 xl:w-10/12 max-w-full m-auto'>
        <div>
          <img src={image_url} alt={username} className='object-cover max-w-40 rounded-full' />
        </div>
        <div>
          <h1 className='text-3xl font-extrabold'>{username.toUpperCase()}</h1>
        </div>
        <div>
          <p className='text-lg text-center'>
            {shortBio}
            <span>
              {/* Utilisation de Next.js Link avec scroll={false} pour désactiver le scroll par défaut */}
              <Link href={`/photographer/${username}/#longbio`} scroll={false} onClick={handleSmoothScroll} className='font-bold'>
                {t('photographerspage.readmore')}
              </Link>
            </span>
          </p>
        </div>
        <Photos photos={photos} />
        <Card id='longbio'>
          <CardHeader className='text-xl uppercase font-extrabold ml-4 mb-[-25px]'>
            {t('photographerspage.about')}
            {username}
          </CardHeader>
          <CardContent className='grid grid-cols-2 text-justify'>
            {[firstHalf, secondHalf].map((chunk, index) => (
              <div key={index} className='p-4'>
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
