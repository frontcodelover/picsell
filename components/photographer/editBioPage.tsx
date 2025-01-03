import React, { useState } from 'react';
import useUserAndTranslation from '@/hooks/useUserAndTranslation'; // Importer le hook pour l'utilisateur et les traductions
import { User } from '@/types/user';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/lib/initSupabase'; // Importer Supabase pour vérifier l'authentification
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import dynamic from 'next/dynamic'; // Import dynamique de ReactQuill
// import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import DOMPurify from 'dompurify'; //
import useCustomToast from '@/hooks/useCustomToast';
// import PhotoProfile from './photoProfile';
// import BannerProfile from './bannerProfile';
import { Button } from '../ui/button';
import Photos from './photos';
import { useFetch } from '@/hooks/useFetch';
import Link from 'next/link';

// Import de ReactQuill avec désactivation du SSR
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const EditBioPage = ({ user }: { user: User }) => {
  const { t } = useUserAndTranslation();
  const authUser = useUser();

  const [isEditing, setIsEditing] = useState(false); // État pour activer l'édition de la bio longue
  const [updatedBio, setUpdatedBio] = useState(authUser?.bio); // État pour la bio longue modifiée

  const { showSuccessToast, showErrorToast } = useCustomToast();

  const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image'];

  const modules = {
    toolbar: [['bold', 'italic', 'underline', 'blockquote'], ['link']],
  };

  const { dataGet } = useFetch({
    compared_id: user.id,
    dbName: 'photos',
    dbField: 'photographer_id',
    selected: '*',
  });

  const handleSaveBio = async () => {
    if (!authUser) return;

    // Optionnel : Sanitize le contenu HTML avant de l'envoyer à la base de données
    const sanitizedBio = DOMPurify.sanitize(updatedBio || '', {
      ALLOWED_TAGS: ['b', 'i', 'u', 'em', 'strong', 'a', 'p', 'ul', 'li', 'br'],
      ALLOWED_ATTR: ['href'],
    });
    // Mise à jour de la bio dans Supabase avec le HTML stylé
    const { error } = await supabase
      .from('users')
      .update({
        bio: sanitizedBio,
      }) // Mettre à jour la bio
      .eq('id', authUser?.id)
      .select(); // Sélectionne les données mises à jour

    if (error) {
      showErrorToast('Erreur lors de la mise à jour de la bio', 'Erreur lors de la mise à jour');
    } else {
      showSuccessToast('Votre bio a été mise à jour avec succès', 'Bio mise à jour');
      setIsEditing(false); // Désactiver le mode édition
      // Mise à jour de la bio locale après succès
      setUpdatedBio(sanitizedBio);
      user.bio = sanitizedBio; // Met à jour l'objet utilisateur avec la nouvelle bio
    }
  };

  const bioshorted = user.bio ? user?.bio?.substring(0, 210) + (user?.bio?.length > 210 ? '...' : '') : t('photographerspage.nobio');

  return (
		<div>
      {/* <BannerProfile user={user} /> */}
      <section className='flex items-center justify-center flex-col gap-8 max-w-full m-auto'>
				<div className='bg-red-500 w-full text-center text-white py-8 flex flex-col gap-4 justify-center'>Mode édition du profil vendeur
					
					<div className='underline'><Link href={`/photographe/${user?.username}`}>Retour au profil public</Link></div>

				</div>
        {/* <PhotoProfile user={user} /> */}
				<div className='w-10/12'>
				<div>
          <h1 className='text-3xl font-extrabold uppercase'>{user?.username}</h1>
        </div>
        <div>
          <div className='text-lg text-center'>
            <div dangerouslySetInnerHTML={{ __html: bioshorted }} />
            <span>
              <Link href='#longbio' className='font-bold'>
                {t('photographerspage.readmore')}
              </Link>
            </span>
          </div>
        </div>

        <Photos photos={dataGet} user={user} />

        <Card id='longbio' className='w-full'>
          <CardHeader className='text-xl uppercase font-extrabold mb-[-25px]'>
            {t('photographerspage.about')} {user?.username}
          </CardHeader>
          <CardContent className='w-full'>
            {isEditing ? (
							<>
                <ReactQuill
                  theme='snow'
                  value={updatedBio}
                  formats={formats}
                  modules={modules}
                  onChange={(_, __, ___, editor) => {
                    const htmlContent = editor.getHTML();
                    setUpdatedBio(htmlContent);
                  }}
                  className='mx-auto my-4'
									/>
                <div className='flex gap-4 '>
                  <button onClick={handleSaveBio} className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700'>
                    Sauvegarder
                  </button>
                  <button onClick={() => setIsEditing(false)} className='bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700'>
                    Annuler
                  </button>
                </div>
              </>
            ) : (
							<>
                <div dangerouslySetInnerHTML={{ __html: user.bio || '' }} className='mx-auto my-4'></div>
                <Button onClick={() => setIsEditing(true)}>{t('photographerspage.edit')}</Button>
              </>
            )}
          </CardContent>
        </Card>
						</div>
      </section>
    </div>
  );
};

export default EditBioPage;
