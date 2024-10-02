// ce composant est un composant de page qui affiche toutes les collections de l'utilisateur
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/initSupabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useUser } from '@/lib/context/UserContext';
import useUserAndTranslation from '@/lib/hooks/useUserAndTranslation';
import { use } from 'i18next';
import DeleteCollection from '@/app/compo/collection/delete';

const DisplayCollectionsForUser = () => {
  const user = useUser();
  const { t } = useUserAndTranslation();
  const [allCollectionFromUser, setAllCollectionFromUser] = useState([]);

  if (!user) {
    return null;
  }

  // interroge la db pour l'utilisateur afin de savoir s'il a des collections si oui il stocke les collections dans allCollectionFromUser
  const fetchCollections = async () => {
    const { data, error } = await supabase.from('collections').select('*').eq('user_id', user.id);
    if (error) {
      console.error('Erreur lors de la récupération des collections :', error);
    } else {
      setAllCollectionFromUser(data);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div className='grid gap-6'>
      <Card x-chunk='dashboard-04-chunk-1'>
        <CardHeader>
          <CardTitle>{t('collections.mycollection')}</CardTitle>
          {allCollectionFromUser.length === 0 ? <CardDescription>{t('collections.nocollection')}</CardDescription> : <CardDescription>{t('collections.listmycollections')}</CardDescription>}
        </CardHeader>
        <CardContent>
          {allCollectionFromUser.map((collection) => (
            <>
              <div key={collection.id}>{collection.title}</div>
              <DeleteCollection collectionId={collection.id} collectionTitle={collection.title} />
            </>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default DisplayCollectionsForUser;
