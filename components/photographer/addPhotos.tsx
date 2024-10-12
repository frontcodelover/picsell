import React, { useState } from 'react';
import useUserAndTranslation from '@/hooks/useUserAndTranslation';
import { Button } from '../ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { supabase } from '@/lib/initSupabase';
import { Switch } from '@/components/ui/switch';
import { User } from '@/types/user';
import { formatTxt } from '@/utils/formatTxt';
import { sliceIdUrl } from '@/utils/sliceIdUrl';
import { z } from 'zod'; // Import Zod
import { zodResolver } from '@hookform/resolvers/zod'; // Resolver Zod pour React Hook Form
import { Textarea } from "@/components/ui/textarea"

// Schéma de validation Zod avec `z.preprocess` pour convertir les strings en nombres
const photoSchema = z.object({
  title: z.string().min(1, 'Le titre est requis').max(100, 'Le titre est trop long'),
  description: z.string().min(1, 'La description est requise').max(1000, 'La description est trop longue'),
  price: z.preprocess((val) => Number(val), z.number().min(0, 'Le prix doit être positif')),
  number: z.preprocess((val) => Number(val), z.number().min(1, 'Il doit y avoir au moins une copie')),
  paper: z.string().min(1, 'Le type de papier est requis'),
  impression: z.string().min(1, 'La méthode d’impression est requise'),
  shipping_delay: z.preprocess((val) => Number(val), z.number().min(1, 'Le délai de livraison doit être d\'au moins 1 jour')),
  shipping_method: z.string().min(1, 'La méthode d\'envoi est requise'),
  format: z.string().min(1, 'Le format est requis'),
  weight: z.preprocess((val) => Number(val), z.number().min(0, 'Le poids doit être positif')),
  image: z.any().refine((files) => files && files.length === 1, 'Un fichier image est requis'),
});

const AddPhotos = ({ user }: { user: User }) => {
  const { t } = useUserAndTranslation();
  const [uploading, setUploading] = useState(false);

  // Utilisation de useForm avec le resolver Zod
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: zodResolver(photoSchema), // Intégration de Zod pour la validation
  });

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
          slug: `${formatTxt(data.title)}-${sliceIdUrl(user.id)}`,
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
      <div className='transition duration-300 p-4'>
        <div className='m-auto flex justify-center w-full pb-4'>
          <div className='border-black border-8 shadow-lg'>
            <div className='flex items-center justify-center w-full h-full '>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className='absolute'>{t('photographerspage.addphoto')}</Button>
                </DialogTrigger>
								<DialogContent>
                  <DialogHeader className='pb-4'>
                    <DialogTitle>{t('photographerspage.addphoto')}</DialogTitle>
                    <DialogDescription>Remplis les informations pour ajouter ta photo.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex items-center gap-6 pb-4 justify-center'>
                      <div className='flex flex-col gap-4'>
                        <div>
                          <label htmlFor='title' className='block text-sm font-semibold pb-1'>
                            Titre de la photo
                          </label>
                          <Input {...register('title')} id="title" placeholder='Titre de la photo' required />
                          {errors.title && <p className="text-red-500">{String(errors.title.message)}</p>}
                        </div>

                        <div>
                          <label htmlFor='description' className='block text-sm font-semibold pb-1'>
                            Description
                          </label>
                          <Textarea {...register('description')} id="description" placeholder='Description' required />
                          {errors.description && <p className="text-red-500">{String(errors.description.message)}</p>}
                        </div>

                        <div>
                          <label htmlFor='price' className='block text-sm font-semibold pb-1'>
                            Prix
                          </label>
                          <Input {...register('price')} id="price" type='number' placeholder='Prix' required />
                          {errors.price && <p className="text-red-500">{String(errors.price.message)}</p>}
                        </div>

                        <div>
                          <label htmlFor='number' className='block text-sm font-semibold pb-1'>
                            Nombre de copies
                          </label>
                          <Input {...register('number')} id="number" type='number' placeholder='Nombre de copies' required />
                          {errors.number && <p className="text-red-500">{String(errors.number.message)}</p>}
                        </div>

                        <div>
                          <label htmlFor='paper' className='block text-sm font-semibold pb-1'>
                            Type de papier
                          </label>
                          <Input {...register('paper')} id="paper" placeholder='Type de papier' required />
                          {errors.paper && <p className="text-red-500">{String(errors.paper.message)}</p>}
                        </div>
                      </div>

                      <div className='flex flex-col gap-4'>
                        <div>
                          <label htmlFor='impression' className='block text-sm font-semibold pb-1'>
                            Méthode d’impression
                          </label>
                          <Input {...register('impression')} id="impression" placeholder='Méthode d’impression' required />
                          {errors.impression && <p className="text-red-500">{String(errors.impression.message)}</p>}
                        </div>

                        <div>
                          <label htmlFor='shipping_delay' className='block text-sm font-semibold pb-1'>
                            Délai de livraison (jours)
                          </label>
                          <Input {...register('shipping_delay')} id="shipping_delay" type='number' placeholder='Délai de livraison (jours)' required />
                          {errors.shipping_delay && <p className="text-red-500">{String(errors.shipping_delay.message)}</p>}
                        </div>

                        <div>
                          <label htmlFor='shipping_method' className='block text-sm font-semibold pb-1'>
                            Méthode d'envoi
                          </label>
                          <Input {...register('shipping_method')} id="shipping_method" placeholder="Méthode d'envoi" required />
                          {errors.shipping_method && <p className="text-red-500">{String(errors.shipping_method.message)}</p>}
                        </div>

                        <div>
                          <label htmlFor='frame' className='text-sm font-semibold pr-4'>
                            Cadre
                          </label>
                          <Switch
                            onCheckedChange={(checked) => {
                              setValue('frame', checked ? 'true' : 'false'); // Met à jour la valeur dans le form
                            }}
                          />
                        </div>

                        <div>
                          <label htmlFor='format' className='block text-sm font-semibold pb-1'>
                            Format
                          </label>
                          <Input {...register('format')} id="format" placeholder='Ex: 20x30, 30x40' required />
                          {errors.format && <p className="text-red-500">{String(errors.format.message)}</p>}
                        </div>

                        <div>
                          <label htmlFor='weight' className='block text-sm font-semibold pb-1'>
                            Poids (g)
                          </label>
                          <Input {...register('weight')} id="weight" type='number' placeholder='Poids (g)' required />
                          {errors.weight && <p className="text-red-500">{String(errors.weight.message)}</p>}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor='image' className='block text-sm font-semibold pb-1'>
                        Fichier image
                      </label>
                      <Input {...register('image')} id="image" type='file' accept='image/*' required className='mb-4' />
                      {errors.image && <p className="text-red-500">{String(errors.image.message)}</p>}
                    </div>

                    <DialogFooter>
                      <Button type='submit' disabled={uploading}>
                        {uploading ? 'Téléchargement...' : 'Ajouter la photo'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
							</Dialog>
							<svg className='w-full h-64 text-gray-200 dark:text-gray-600' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 18'>
                <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPhotos;
