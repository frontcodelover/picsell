import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/initSupabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@/lib/context/UserContext';
import useUserAndTranslation from '@/lib/hooks/useUserAndTranslation';
import DisplayCollectionsForUser from './displayallcollection';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';

const Collections = () => {
  const user = useUser();
  const [collectionName, setCollectionName] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [allCollections, setAllCollections] = useState([]); // State pour gérer les collections
  const { t } = useUserAndTranslation();

  if (!user) {
    return <div>Utilisateur non trouvé</div>;
  }

  // Récupérer les collections à l'initialisation
  const fetchCollections = async () => {
    const { data, error } = await supabase.from('collections').select('*').eq('user_id', user.id);
    if (error) {
      console.error('Erreur lors de la récupération des collections :', error);
    } else {
      setAllCollections(data);
    }
  };

  useEffect(() => {
    fetchCollections(); // Charger les collections une fois au montage
  }, [user.id]);

  // Fonction pour créer une nouvelle collection et mettre à jour la liste locale
  const createCollection = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.from('collections').insert({
      title: collectionName,
      description: collectionDescription,
      user_id: user.id,
    }).select(); // Utilisation de .select() pour retourner la collection insérée

    if (error) {
      console.error('Erreur lors de la création de la collection :', error);
    } else {
      setAllCollections([...allCollections, ...data]); // Ajoute la nouvelle collection au tableau existant
      setCollectionName(''); // Réinitialise le champ après création
      setCollectionDescription(''); // Réinitialise la description
    }
  };

  // Fonction pour supprimer une collection et mettre à jour la liste
  const handleDeleteCollection = (collectionId) => {
    setAllCollections(allCollections.filter(collection => collection.id !== collectionId));
  };

  // Fonction pour mettre à jour une collection
  const handleUpdateCollection = (collectionId, updatedTitle, updatedDescription) => {
    setAllCollections(
      allCollections.map((collection) =>
        collection.id === collectionId
          ? { ...collection, title: updatedTitle, description: updatedDescription }
          : collection
      )
    );
  };

  return (
    <div className='grid gap-6'>
      <Card x-chunk='dashboard-04-chunk-1'>
        <CardHeader>
          <CardTitle>{t('collections.create')}</CardTitle>
          <CardDescription>{t('collections.createdescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={createCollection}>
            <div className='space-y-4'>
              <div>
                <Label>{t('collections.indicatecollection')}</Label>
                <Input value={collectionName} onChange={(e) => setCollectionName(e.target.value)} placeholder={t('collections.collectionname')} />
              </div>
              <div>
                <Label>{t('collections.indicatecollectiondescription')}</Label>
                <Textarea value={collectionDescription} onChange={(e) => setCollectionDescription(e.target.value)} placeholder={t('collections.collectiondescription')} />
              </div>
              <CardFooter className='border-t py-4'>
                <Button type='submit'>{t('collections.create')}</Button>
              </CardFooter>
            </div>
          </form>
        </CardContent>
      </Card>
      {/* Passer les collections et les fonctions de suppression et d'édition */}
      <DisplayCollectionsForUser allCollections={allCollections} onDelete={handleDeleteCollection} onUpdate={handleUpdateCollection} />
    </div>
  );
};

export default Collections;
