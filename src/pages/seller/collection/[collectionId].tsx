import { useEffect, useState } from 'react';
import { supabase } from '@/lib/initSupabase';
import { useRouter } from 'next/router';
import UploadForm from './uploadform';
import { useUser } from '@/context/UserContext';
import CollectionLayout from '../../../../layouts/collection/layout';
import BioProfil from '@/components/photographer/bioprofil';

const CollectionPage = () => {
  interface Photo {
    id: string;
    title: string;
    description: string;
    image_url: string;
  }

  const [photos, setPhotos] = useState<Photo[]>([]);
  interface Collection {
    id: string;
    title: string;
    description: string;
    user_id: string; // Ajoute le champ user_id pour l'ID du propriétaire de la collection
  }

  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { collectionId } = router.query; // ID de la collection depuis l'URL
  const user = useUser();

  useEffect(() => {
    if (!user) {
      // Si l'utilisateur n'est pas connecté, redirige-le
      router.push('/login');
      return;
    }

    if (collectionId) {
      fetchCollection();
    }
  }, [collectionId, user]);

  // Récupérer les détails de la collection
  const fetchCollection = async () => {
    const { data, error } = await supabase.from('collections').select('*').eq('id', collectionId).single();

    if (error) {
      console.error('Erreur lors de la récupération de la collection :', error);
      return;
    }

    // Vérifie si l'utilisateur connecté est bien le propriétaire de la collection
    if (data.user_id !== user?.id) {
      console.warn("Accès non autorisé : cet utilisateur n'est pas le propriétaire de la collection");
      router.push('/'); // Redirige vers la page d'accueil ou une autre page
      return;
    }

    setCollection(data);
    fetchPhotos(); // Récupère les photos si l'accès est autorisé
  };

  // Récupérer les photos de la collection
  const fetchPhotos = async () => {
    const { data, error } = await supabase.from('photos').select('*').eq('collection_id', collectionId);

    if (error) {
      console.error('Erreur lors de la récupération des photos :', error);
    } else {
      setPhotos(data);
      console.log('data', data);
    }
  };

  // Uploader une photo dans Supabase Storage et ajouter les métadonnées dans la table 'photos'
  const uploadPhoto = async (file: File, title: string, description: string) => {
    setLoading(true);

    const fileName = `${Date.now()}_${file.name}`;

    const { data, error: uploadError } = await supabase.storage.from('photos').upload(`public/${fileName}`, file);

    if (uploadError) {
      console.error('Erreur lors du téléchargement de la photo :', uploadError);
      setLoading(false);
      return;
    }

    const imageUrl = `https://dqqwbvtouglhiutfehvr.supabase.co/storage/v1/object/public/photos/public/${fileName}`;

    const { error: insertError } = await supabase.from('photos').insert({
      collection_id: collectionId,
      title,
      description,
      user_id: user?.id,
      image_url: imageUrl,
    });

    if (insertError) {
      console.error("Erreur lors de l'insertion des métadonnées :", insertError);
    } else {
      fetchPhotos();
    }

    setLoading(false);
  };

  console.log('photos', photos);

  return (
    <>
      <BioProfil
        username={user?.username || ''}
        image_url={user?.image_url || ''}
        banner_url={user?.banner_url || ''}
        bio_html={user?.bio_html || ''}
        user_id={user?.id || ''}
        photos={photos}
        onBioUpdate={() => {}} // Replace with actual function if needed
      />
      <CollectionLayout>
        <div>
          <h1>{collection?.title}</h1>
          <p>{collection?.description}</p>
        </div>
        <div>
          <h2>Photos</h2>
          {photos.length === 0 ? (
            <p>Aucune photo dans cette collection.</p>
          ) : (
            <ul>
              {photos.map((photo) => (
                <li key={photo.id}>
                  <h3>{photo.title}</h3>
                  <p>{photo.description}</p>
                  {photo.image_url && <img src={photo.image_url} alt={photo.title} width='200' />}
                </li>
              ))}
            </ul>
          )}

          <h2>Ajouter une photo</h2>
          <UploadForm onUpload={uploadPhoto} loading={loading} />
        </div>
      </CollectionLayout>
    </>
  );
};

export default CollectionPage;
