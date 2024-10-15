import React, { useState, useEffect } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog'; // Remplace par le chemin où tu importes tes composants Shadcn
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import EditBioPage from '@/components/photographer/editBioPage';
import { useRouter } from 'next/router';
import useUserAndTranslation from '@/hooks/useUserAndTranslation';

const Edit = () => {
  const authUser = useUser();
  const router = useRouter();
  const { t } = useUserAndTranslation();
  const [open, setOpen] = useState(false);

  // useEffect pour gérer l'ouverture du modal et le stockage dans le localStorage
  useEffect(() => {
    if (!authUser) {
      router.push('/');
      return;
    }

    const modalAlreadyOpened = localStorage.getItem('modalAlreadyOpened');

    if (!modalAlreadyOpened) {
      setOpen(true);
      localStorage.setItem('modalAlreadyOpened', 'true');
    }
  }, [authUser, router]);

  return (
    <>
      {authUser ? <EditBioPage user={authUser} /> : null}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('photographerspage.infosedit2')}</AlertDialogTitle>
            <AlertDialogDescription>{t('photographerspage.infosedit')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Button onClick={() => setOpen(false)}>OK</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Edit;
