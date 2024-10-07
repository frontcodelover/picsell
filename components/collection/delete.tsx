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
import { supabase } from '@/lib/initSupabase';
import useUserAndTranslation from '@/hooks/useUserAndTranslation';
import { DeleteCollectionProps } from '@/types/collection';

const DeleteCollection: React.FC<DeleteCollectionProps> = ({ collectionId, collectionTitle, onDelete }) => {
  const { t } = useUserAndTranslation();
  const [open, setOpen] = useState(false);
  const cancelRef = useRef(null);

  const deleteCollection = async () => {
    const { error } = await supabase.from('collections').delete().eq('id', collectionId);
    if (error) {
      console.error('Erreur lors de la suppression de la collection :', error);
    } else {
      setOpen(false); // Fermer la modal après suppression
      onDelete(collectionId); // Appeler la fonction pour mettre à jour la liste dans le parent
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Button className='bg-white text-foreground border hover:bg-danger-hover hover:text-white'>
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
  );
};

export default DeleteCollection;
