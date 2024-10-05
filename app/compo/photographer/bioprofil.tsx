import React, { useState, useEffect } from 'react';
import Photos from './photos';
import useUserAndTranslation from '@/lib/hooks/useUserAndTranslation';
import { supabase } from '@/lib/initSupabase'; // Importer Supabase pour vérifier l'authentification
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import dynamic from 'next/dynamic'; // Import dynamique de ReactQuill
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify'; // Import de DOMPurify pour nettoyer le HTML


// Import de ReactQuill avec désactivation du SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface BioProfilProps {
  username: string;
  image_url: string;
  banner_url: string;
  bio: string;
  user_id: string; // On récupère aussi le user_id du photographe
  photos: any[]; // Ajuster le type des photos si nécessaire
}

const BioProfil: React.FC<BioProfilProps> = ({ username, image_url, banner_url, bio, user_id, photos }) => {
  const { t } = useUserAndTranslation();
  const [currentUser, setCurrentUser] = useState<any>(null); // Stocker l'utilisateur connecté
  const [isEditing, setIsEditing] = useState<boolean>(false); // État pour activer l'édition de la bio longue
  const [updatedBio, setUpdatedBio] = useState<string>(bio); // État pour la bio longue modifiée

  // Vérifier l'utilisateur connecté avec Supabase
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser(); // Récupère l'utilisateur connecté
      setCurrentUser(user);
    };

    fetchUser();
  }, []);

  // Fonction pour enregistrer les modifications de la bio longue
	const handleSaveBio = async () => {
		if (!currentUser) return;
	
		// Optionnel : Sanitize le contenu HTML avant de l'envoyer à la base de données
		const sanitizedBio = DOMPurify.sanitize(updatedBio);
	
		// Mise à jour de la bio dans Supabase avec le HTML stylé
		const { error } = await supabase
			.from('photographers')  // Nom de la table
			.update({ bio: sanitizedBio })  // Mettre à jour la colonne avec le HTML
			.eq('user_id', currentUser.id);  // Vérifier que l'utilisateur correspond
	
		if (!error) {
			setIsEditing(false);  // Désactiver le mode édition
		} else {
			console.error('Erreur lors de la mise à jour de la bio:', error);
		}
	};
	

  // Fonction pour séparer la bio longue en deux parties (avant et après un point)
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

  return (
    <div>
      <img src={banner_url} alt='banner' className='w-full h-60 object-cover mb-6' />
      <section className='flex items-center justify-center flex-col gap-8 xl:w-10/12 max-w-full m-auto'>
        <div>
          <img src={image_url} alt={username} className='object-cover max-w-40 rounded-full' />
        </div>
        <div>
          <h1 className='text-3xl font-extrabold uppercase'>{username}</h1>
        </div>

        {/* Section bio courte avec bouton Lire la suite */}
        <div>
          <p className='text-lg text-center'>
            {bio?.substring(0, 200) + (bio?.length > 200 ? '...' : '')}
            <span>
              <a href='#longbio' className='font-bold'>
                {t('photographerspage.readmore')}
              </a>
            </span>
          </p>
        </div>

        <Photos photos={photos} />

        {/* Section bio longue avec édition */}
        <Card id='longbio' className='w-full'>
          <CardHeader className='text-xl uppercase font-extrabold ml-4 mb-[-25px]'>
            {t('photographerspage.about')} {username}
          </CardHeader>

          {/* Vérification si l'utilisateur est le propriétaire du profil */}
          {currentUser?.id === user_id ? (
            <div className='w-full'>
              {/* Formulaire d'édition de la bio longue */}
              {isEditing ? (
                <div className='flex flex-col gap-4 w-full'>
                  <ReactQuill theme="snow" value={updatedBio} onChange={setUpdatedBio} className='h-96 w-11/12 mx-auto my-4' />
                  <div className='flex gap-4 py-4 px-8'>
                    <button onClick={handleSaveBio} className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700'>
                      Sauvegarder
                    </button>
                    <button onClick={() => setIsEditing(false)} className='bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700'>
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <CardContent className='grid grid-cols-2 text-justify'>
                  {[firstHalf, secondHalf].map((chunk, index) => (
                    <div key={index} className='p-4'>
                      {chunk}
                    </div>
                  ))}
                  <button onClick={() => setIsEditing(true)} className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700'>
                    Modifier ma bio
                  </button>
                </CardContent>
              )}
            </div>
          ) : (
            // Si l'utilisateur n'est pas le propriétaire, afficher la bio normale
            <div>
              {[firstHalf, secondHalf].map((chunk, index) => (
                <div key={index} className='p-4'>
                  {chunk}
                </div>
              ))}
            </div>
          )}
        </Card>
      </section>
    </div>
  );
};

export default BioProfil;
