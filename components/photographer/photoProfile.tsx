import React, { useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Assuming you have an Input component in your project
import { supabase } from '@/lib/initSupabase';
import { LuPencil } from 'react-icons/lu';
import Image from 'next/image';
import useUserAndTranslation from '@/hooks/useUserAndTranslation';
import useCustomToast from '@/hooks/useCustomToast';

interface User {
  avatar_url?: string;
  username: string;
  id: string;
}

interface PhotoProfileProps {
  user: User;
}

const PhotoProfile: React.FC<PhotoProfileProps> = ({ user }) => {
  const [profilePic, setProfilePic] = useState(user?.avatar_url);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { t } = useUserAndTranslation();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const handleUpdateProfilePic = async () => {
    if (!selectedFile) {
      showErrorToast(t('photographerspage.erreurfileempty'), t('photographerspage.erreurfiletext'));
      return;
    }

    await uploadPhoto(selectedFile);
  };

  const uploadPhoto = async (file: File) => {
    setLoading(true);

    const fileName = `${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage.from('avatars').upload(`public/${fileName}`, file);

    if (uploadError) {
      showErrorToast(t('photographerspage.errordonwload'), t('photographerspage.errordownloadtitle'));
      setLoading(false);
      return;
    }

    const imageUrl = `https://dqqwbvtouglhiutfehvr.supabase.co/storage/v1/object/public/avatars/public/${fileName}`;

    const { error: insertError } = await supabase.from('users').update({ avatar_url: imageUrl }).eq('id', user?.id);

    if (insertError) {
      console.error('Erreur lors de la mise à jour de la photo de profil :', insertError);
    } else {
      setProfilePic(imageUrl);
      showSuccessToast(t('photographerspage.successupload'), t('photographerspage.successuploadtitle'));
    }

    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limiter la taille des fichiers à 5 MB
    if (file.size > 10 * 1024 * 1024) {
      showErrorToast(t('photographerspage.toobig'), t('photographerspage.titlebig'));
      return;
    }

    setSelectedFile(file);
  };

  return (
    <>
      <div className='relative w-40 h-40'>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:opacity-100 opacity-0'>
              <LuPencil />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('photographerspage.change')}</AlertDialogTitle>
              <AlertDialogDescription>{t('photographerspage.upload')}</AlertDialogDescription>
              <Input type='file' onChange={handleFileChange} accept='image/*' />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={handleUpdateProfilePic} disabled={loading}>
                {loading ? 'Chargement...' : 'Confirmer'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {profilePic ? (
          <Image src={profilePic} alt={user.username} className='object-cover w-full h-full rounded-full' width={160} height={160} />
        ) : (
          <div className='flex items-center justify-center w-full h-full rounded-full bg-gray-300 dark:bg-gray-700'>
            <svg className='w-10 h-10 text-gray-200 dark:text-gray-600' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 18'>
              <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
            </svg>
          </div>
        )}
      </div>
    </>
  );
};

export default PhotoProfile;
