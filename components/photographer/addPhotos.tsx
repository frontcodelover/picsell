import React, { useState } from 'react';
import useUserAndTranslation from '@/hooks/useUserAndTranslation';
import { Button } from '../ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { supabase } from '@/lib/initSupabase';
import { Switch } from '@/components/ui/switch';
import { randomUUID } from 'crypto';
import { User } from '@/types/user';

const AddPhotos = ({ user }: { user: User }) => {
  const { t } = useUserAndTranslation();
  const [uploading, setUploading] = useState(false);
  const { register, handleSubmit, setValue, reset } = useForm();

  const onSubmit = async (data: any) => {
    if (!user) return; // Vérifie que l'utilisateur est connecté
    try {
      setUploading(true);
      const uuid = self.crypto.randomUUID();
      console.log('UUID', uuid);
      // Upload de l'image dans Supabase Storage
      const file = data.image[0]; // On prend le fichier image
      const fileName = `${user.id}/${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage.from('photos').upload(`public/${uuid}/${fileName}`, file);

      if (uploadError) {
        console.error("Erreur d'upload :", uploadError);
        return;
      }

      const imageUrl = `https://dqqwbvtouglhiutfehvr.supabase.co/storage/v1/object/public/photos/public/${uuid}/${fileName}`;

      const formatsArray = data.format.split(',').map((f: string) => f.trim()); // On sépare les formats et on supprime les espaces inutiles
      const formatsJson = formatsArray.reduce((acc: { [key: string]: string }, format: string, index: number) => {
        acc[`format${index + 1}`] = format;
        return acc;
      }, {});

      // Insertion des informations dans la base de données
      const { data: photoData, error: insertError } = await supabase.from('photos').insert([
        {
          photographer_id: user.id,
          title: data.title,
          description: data.description,
          price: data.price,
          image_url: imageUrl,
          is_available: true,
          number: data.number, // Ajout du nombre de copies
          paper: data.paper, // Type de papier
          impression: data.impression, // Méthode d'impression
          shipping_delay: data.shipping_delay, // Délai de livraison
          shipping_method: data.shipping_method, // Méthode d'envoi
          frame: data.frame, // Avec ou sans cadre (boolean)
          format: formatsJson, // Format d'impression en JSON
          weight: data.weight, // Poids de la photo
        },
      ]);

      if (insertError) {
        console.error("Erreur d'insertion dans la base de données :", insertError);
        return;
      }

      // Reset du formulaire après succès
      reset();
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <h2 className='text-2xl uppercase font-extrabold py-4'>{t('photographerspage.availableworks')}</h2>
      <div className='w-full m-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='rounded-lg p-4 transition duration-300'>
            <div className='m-auto flex justify-center w-full pb-4'>
              <div className='border-black border-8 shadow-lg'>
                <div className='flex items-center justify-center w-full h-full rounded-full bg-gray-300 dark:bg-gray-700'>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className='absolute'>{t('photographerspage.addphoto')}</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{t('photographerspage.addphoto')}</DialogTitle>
                        <DialogDescription>Remplis les informations pour ajouter ta photo.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='space-y-4'>
                          <Input {...register('title')} placeholder='Titre de la photo' required />
                          <Input {...register('description')} placeholder='Description' required />
                          <Input {...register('price')} type='number' placeholder='Prix' required />
                          <Input {...register('number')} type='number' placeholder='Nombre de copies' required />
                          <Input {...register('paper')} placeholder='Type de papier' required />
                          <Input {...register('impression')} placeholder='Méthode d’impression' required />
                          <Input {...register('shipping_delay')} type='number' placeholder='Délai de livraison (jours)' required />
                          <Input {...register('shipping_method')} placeholder="Méthode d'envoi" required />
                          <label htmlFor='frame'>Cadre</label>
                          <Switch
                            onCheckedChange={(checked) => {
                              setValue('frame', checked ? 'true' : 'false'); // Met à jour la valeur dans le form
                            }}
                          />
                          {/* Nouveau champ pour entrer les formats */}
                          <Input {...register('format')} placeholder='Ex: 20x30, 30x40' required />
                          <Input {...register('weight')} type='number' placeholder='Poids (g)' required />
                          <Input {...register('image')} type='file' accept='image/*' required />
                        </div>
                        <DialogFooter>
                          <Button type='submit' disabled={uploading}>
                            {uploading ? 'Téléchargement...' : 'Ajouter la photo'}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <svg className='w-full h-full text-gray-200 dark:text-gray-600' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 18'>
                    <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
                  </svg>
                </div>
              </div>
            </div>
            <h3 className='text-xl font-medium text-gray-900 mb-2'>Ma super photo</h3>
            <p className='text-gray-500'>Dimensions : 300 x 200 cm</p>
            <p className='text-gray-500 mb-4'>Prix : €200</p>
            <button className='w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300'>Ajouter au panier</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPhotos;
