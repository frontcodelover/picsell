import React, { useState, useEffect } from 'react';
import Photos from './photos';
import useUserAndTranslation from '@/hooks/useUserAndTranslation';
import { supabase } from '@/lib/initSupabase'; // Importer Supabase pour vérifier l'authentification
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import dynamic from 'next/dynamic'; // Import dynamique de ReactQuill
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify'; // Import de DOMPurify pour nettoyer le HTML
import { BioProfilProps } from '@/types/profile';
// Import de ReactQuill avec désactivation du SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const BioProfil: React.FC<BioProfilProps> = ({ username, onBioUpdate }) => {
  const { t } = useUserAndTranslation();
  const [currentUser, setCurrentUser] = useState<any>(null); // Stocker l'utilisateur connecté
  const [isEditing, setIsEditing] = useState<boolean>(false); // État pour activer l'édition de la bio longue
	// const [updatedBio, setUpdatedBio] = useState<string>(bio_html); // État pour la bio longue modifiée
	
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
    const sanitizedBio = DOMPurify.sanitize(updatedBio, {
      ALLOWED_TAGS: ['b', 'i', 'u', 'em', 'strong', 'a', 'h1', 'h2', 'h3', 'p', 'ul', 'li'],
      ALLOWED_ATTR: ['href'],
    });

    const encodedBio = encodeURIComponent(updatedBio);

    // Mise à jour de la bio dans Supabase avec le HTML stylé
    const { data, error } = await supabase
      .from('photographers')
      .update({ bio_html: sanitizedBio }) // Mettre à jour la bio
      .eq('user_id', currentUser.id)
      .select(); // Sélectionne les données mises à jour

    if (error) {
      console.error('Erreur lors de la mise à jour de la bio:', error);
    } else {
      console.log('Mise à jour réussie:', data); // Affiche les données mises à jour
      onBioUpdate(sanitizedBio);
      setIsEditing(false); // Désactiver le mode édition
    }
  };

  // Fonction pour séparer la bio longue en deux parties (avant et après un point)
  const splitBioAtPeriod = (bio_html: string | undefined) => {
    if (!bio_html) return ['', ''];
    const middle = Math.floor(bio_html.length / 2.5);
    const secondHalf = bio_html.slice(middle);
    const firstPeriodIndex = secondHalf.indexOf('.');
    if (firstPeriodIndex === -1) return [bio_html.slice(0, middle), bio_html.slice(middle)];
    const cutIndex = middle + firstPeriodIndex + 1;
    return [bio_html.slice(0, cutIndex), bio_html.slice(cutIndex)];
  };

  const [firstHalf, secondHalf] = splitBioAtPeriod(bio_html);

  console.log('update', updatedBio);

  const bioshorted = bio_html?.substring(0, 200) + (bio_html?.length > 200 ? '...' : '');

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
            <div dangerouslySetInnerHTML={{ __html: bioshorted }} />

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
                  <ReactQuill
                    theme='snow'
                    value={updatedBio}
                    onChange={(content, delta, source, editor) => {
                      const htmlContent = editor.getHTML();
                      console.log('Contenu modifié:', htmlContent);
                      setUpdatedBio(htmlContent);
                    }}
                    className='h-96 w-11/12 mx-auto my-4'
                  />
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
                      <div dangerouslySetInnerHTML={{ __html: chunk }} />
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
                  <div dangerouslySetInnerHTML={{ __html: chunk }} />
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
