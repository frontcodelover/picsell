// création d'un composant permettant de supprimer une collection il affichera un bouton avec une modal de confirmation pour supprimer la collection
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { LuTrash2 } from 'react-icons/lu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useUser } from '@/lib/context/UserContext';
import { supabase } from '@/lib/initSupabase';
import useUserAndTranslation from '@/lib/hooks/useUserAndTranslation';

const DeleteCollection = ({ collectionId, collectionTitle }) => {
  const user = useUser();
  const { t } = useUserAndTranslation();
  const [open, setOpen] = useState(false);
  const cancelRef = useRef(null);

  const deleteCollection = async () => {
    const { error } = await supabase.from('collections').delete().eq('id', collectionId);
    if (error) {
      console.error('Erreur lors de la suppression de la collection :', error);
    } else {
      alert('Collection supprimée avec succès !');
    }
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger>
          <Button className='bg-forground text-foreground border hover:bg-danger-hover hover:text-white'>
            <LuTrash2 />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('collections.deletecollection')}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>{t('collections.deletecollectionconfirmation', { collectionTitle })}</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel ref={cancelRef} className='hover:bg-transparent hover:text-foreground'>
              {t('collections.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction className='bg-danger hover:bg-danger-hover' onClick={deleteCollection}>
              {t('collections.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteCollection;
