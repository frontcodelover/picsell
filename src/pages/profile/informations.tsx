import React, { useState } from 'react';
import ProfileLayout from './layout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { useUser } from '@/lib/context/UserContext';
import useUserAndTranslation from '@/lib/hooks/useUserAndTranslation';
import { supabase } from '@/lib/initSupabase'; // Assurez-vous d'avoir l'instance de Supabase configurée

const Profile = () => {
  const user = useUser();
  const { t } = useUserAndTranslation();

  // Ajouter des états locaux pour chaque champ
  const [firstname, setFirstname] = useState(user?.firstname || '');
  const [name, setName] = useState(user?.name || '');
  const [username, setUsername] = useState(user?.username || '');
  const [address, setAddress] = useState(user?.address || '');
  const [zipcode, setZipcode] = useState(user?.zipcode || '');
  const [city, setCity] = useState(user?.city || '');
  const [country, setCountry] = useState(user?.country || '');
  const [instagram, setInstagram] = useState(user?.instagram || '');
  const [siret, setSiret] = useState(user?.siret || '');

  // Fonction pour mettre à jour les informations dans Supabase
  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
    const { error } = await supabase
      .from('profiles') // Remplacer 'profiles' par le nom de votre table Supabase si différent
      .update({
        firstname,
        name,
        username,
        address,
        zipcode,
        city,
        country,
				instagram,
				siret,
      })
      .eq('email', user?.email); // Utiliser 'user_id' si la colonne est UUID dans Supabase

    if (error) {
      console.error('Erreur lors de la mise à jour du profil :', error);
    } else {
      alert('Profil mis à jour avec succès !');
    }
  };

  return (
    <ProfileLayout>
      <div className='grid gap-6'>
        <Card key={user?.id} x-chunk='dashboard-04-chunk-1'>
          <CardHeader>
            <CardTitle>{t('Votre profil')}</CardTitle>
            <CardDescription>{t('Les informations de votre profil')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={updateProfile}>
              <div className='space-y-4'>
                <div>
                  <Label htmlFor='firstname'>{t('userinfo.firstname')}</Label>
                  <Input id='firstname' placeholder='Prénom' value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor='lastname'>{t('userinfo.lastname')}</Label>
                  <Input id='name' placeholder='Nom' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor='username'>{t('userinfo.username')}</Label>
                  <Input id='username' placeholder='Pseudo' value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor='address'>{t('userinfo.address')}</Label>
                  <Input id='address' placeholder='Adresse' value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor='zipcode'>{t('userinfo.postalcode')}</Label>
                  <Input id='zipcode' type='number' placeholder='Code postal' value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor='city'>{t('userinfo.city')}</Label>
                  <Input id='city' placeholder='Ville' value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor='country'>{t('userinfo.country')}</Label>
                  <Input id='country' placeholder='Pays' value={country} onChange={(e) => setCountry(e.target.value)} />
								</div>
								{user?.is_seller && (
									<>
								<div>
                  <Label htmlFor='instagram'>Instagram</Label>
                  <Input id='instagram' placeholder='Instagram' value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor='siret'>Numéro de siret (optionnel)</Label>
                  <Input id='siret' placeholder='siret' value={siret} onChange={(e) => setSiret(e.target.value)} />
                </div>
									</>
								)}
              </div>
              <CardFooter className='border-t py-4'>
                <Button type='submit'>{t('save')}</Button> {/* Le bouton déclenche la soumission du formulaire */}
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProfileLayout>
  );
};

export default Profile;
