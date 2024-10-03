import { useEffect, useState } from 'react';
import { supabase } from '@/lib/initSupabase';
import { useRouter } from 'next/router';
import UploadForm from './uploadform';
import { useUser } from '@/lib/context/UserContext';

const CollectionPage = () => {
  const [photos, setPhotos] = useState([]);
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { collectionId } = router.query; // ID de la collection depuis l'URL
  const user = useUser();

  useEffect(() => {
    if (collectionId) {
      fetchCollection();
      fetchPhotos();
    }
  }, [collectionId]);

  // Récupérer les détails de la collection
  const fetchCollection = async () => {
    const { data, error } = await supabase.from('collections').select('*').eq('id', collectionId).single();

    if (error) {
      console.error('Erreur lors de la récupération de la collection :', error);
    } else {
      setCollection(data);
    }
  };

  // Récupérer les photos de la collection
  const fetchPhotos = async () => {
    const { data, error } = await supabase.from('photos').select('*').eq('collection_id', collectionId);

    if (error) {
      console.error('Erreur lors de la récupération des photos :', error);
    } else {
      setPhotos(data);
    }
  };

  // Uploader une photo dans Supabase Storage et ajouter les métadonnées dans la table 'photos'
  const uploadPhoto = async (file, title, description) => {
    setLoading(true);

    // Générer un nom de fichier unique pour éviter les conflits
    const fileName = `${Date.now()}_${file.name}`;

    // Upload du fichier dans le bucket 'photos'
    const { data, error: uploadError } = await supabase.storage
      .from('photos') // Bucket 'photos'
      .upload(`public/${fileName}`, file); // Chemin de stockage 'public/'

    if (uploadError) {
      console.error('Erreur lors du téléchargement de la photo :', uploadError);
      setLoading(false);
      return;
    }

    // Construire l'URL de l'image
    const imageUrl = `https://dqqwbvtouglhiutfehvr.supabase.co/storage/v1/object/public/photos/public/${fileName}`;

    // Insérer les métadonnées de la photo dans la table 'photos'
    const { error: insertError } = await supabase.from('photos').insert({
      collection_id: collectionId,
      title,
      description,
      user_id: user.id, // ID de l'utilisateur connecté
      image_url: imageUrl,
    });

    if (insertError) {
      console.error("Erreur lors de l'insertion des métadonnées :", insertError);
    } else {
      fetchPhotos(); // Recharger les photos après l'ajout
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>{collection?.title}</h1>
      <p>{collection?.description}</p>

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
  );
};

export default CollectionPage;
