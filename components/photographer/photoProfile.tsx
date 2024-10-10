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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Assuming you have an Input component in your project
import { supabase } from '@/lib/initSupabase';

interface User {
  avatar_url?: string;
  username: string;
}

interface PhotoProfileProps {
  user: User;
}

const PhotoProfile: React.FC<PhotoProfileProps> = ({ user }) => {
  const [profilePic, setProfilePic] = useState(user?.avatar_url);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpdateProfilePic = async () => {
    if (!selectedFile) {
      alert("Sélectionne un fichier avant de confirmer !");
      return;
    }

    await uploadPhoto(selectedFile);
  };

  const uploadPhoto = async (file: File) => {
    setLoading(true);

    const fileName = `${Date.now()}_${file.name}`;
    const { data, error: uploadError } = await supabase.storage
      .from('photos')
      .upload(`public/${fileName}`, file);

    if (uploadError) {
      console.error('Erreur lors du téléchargement de la photo :', uploadError);
      setLoading(false);
      return;
    }

    const imageUrl = `https://dqqwbvtouglhiutfehvr.supabase.co/storage/v1/object/public/photos/public/${fileName}`;

    const { error: insertError } = await supabase
      .from('users')
      .update({ avatar_url: imageUrl })
      .eq('username', user.username); // Mette à jour l'utilisateur en fonction de son username

    if (insertError) {
      console.error('Erreur lors de la mise à jour de la photo de profil :', insertError);
    } else {
      setProfilePic(imageUrl); // On met à jour l'état avec la nouvelle image
    }

    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limiter la taille des fichiers à 5 MB
    if (file.size > 5 * 1024 * 1024) {
      alert('Le fichier est trop volumineux. Maximum 5MB.');
      return;
    }

    setSelectedFile(file);
  };

  return (
    <>
      <div>
        {profilePic ? (
          <img
            src={profilePic}
            alt={user.username}
            className="object-cover max-w-40 rounded-full"
          />
        ) : (
          <div className="flex items-center justify-center object-cover max-h-40 max-w-40 w-full h-40 rounded-full bg-gray-300 dark:bg-gray-700">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
        )}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="mt-4">Mettre à jour la photo de profil</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Es-tu sûr de vouloir changer la photo de profil ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action remplacera l'image actuelle. Sélectionne une nouvelle image ci-dessous.
              </AlertDialogDescription>
              <Input type="file" onChange={handleFileChange} />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={handleUpdateProfilePic} disabled={loading}>
                {loading ? "Chargement..." : "Confirmer"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default PhotoProfile;
