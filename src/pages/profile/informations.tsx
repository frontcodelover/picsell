import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/initSupabase';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import ProfileLayout from './layout';
import { useUser } from '@/lib/context/UserContext';

const Profile = () => {
  const [loading, setLoading] = useState(true);

  const user = useUser();

  return (
    <ProfileLayout>
      {
        <div>
          <div className='grid gap-6'>
            <Card key={user?.id} x-chunk='dashboard-04-chunk-1'>
              <CardHeader>
                <CardTitle>Votre profil</CardTitle>
                <CardDescription>Les informations de votre profil</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className='space-y-4'>
                    <div>
                      <Label htmlFor='firstname' className='block text-sm font-medium text-gray-700'>
                        Prénom
                      </Label>
                      <Input
                        id='firstname'
                        placeholder={user?.firstname ?? 'a renseigner'}
                        defaultValue={user?.firstname}
                        // Ajoutez un onChange ici si vous souhaitez que les champs soient contrôlés
                      />
                    </div>
                    <div>
                      <Label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                        Nom
                      </Label>
                      <Input
                        id='name'
                        placeholder={user?.name ?? 'a renseigner'}
                        defaultValue={user?.name}
                        // Ajoutez un onChange ici si nécessaire
                      />
                    </div>
                    <div>
                      <Label htmlFor='username' className='block text-sm font-medium text-gray-700'>
                        Pseudo
                      </Label>
                      <Input
                        id='username'
                        placeholder={user?.username ?? 'a renseigner'}
                        defaultValue={user?.username}
                        // Ajoutez un onChange ici si nécessaire
                      />
                    </div>
                    <div>
                      <Label htmlFor='adress' className='block text-sm font-medium text-gray-700'>
                        Adresse
                      </Label>
                      <Input
                        id='adress'
                        placeholder={user?.adress ?? 'a renseigner'}
                        defaultValue={user?.adress}
                        // Ajoutez un onChange ici si nécessaire
                      />
                    </div>
                    <div>
                      <Label htmlFor='city' className='block text-sm font-medium text-gray-700'>
                        Ville
                      </Label>
                      <Input
                        id='city'
                        placeholder={user?.city ?? 'a renseigner'}
                        defaultValue={user?.city}
                        // Ajoutez un onChange ici si nécessaire
                      />
                    </div>
                    <div>
                      <Label htmlFor='zipcode' className='block text-sm font-medium text-gray-700'>
                        Code postal
                      </Label>
                      <Input
												id='zipcode'
												type='number'
                        placeholder={String(user?.zipcode ?? '0000')}
                        defaultValue={user?.zipcode}
                        // Ajoutez un onChange ici si nécessaire
                      />
                    </div>
                    <div>
                      <Label htmlFor='instagram' className='block text-sm font-medium text-gray-700'>
                        Instagram
                      </Label>
                      <Input
                        id='instagram'
                        placeholder={user?.instagram ?? 'a renseigner'}
                        defaultValue={user?.instagram}
                        // Ajoutez un onChange ici si nécessaire
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className='border-t px-6 py-4'>
                <Button>Save</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      }
    </ProfileLayout>
  );
};

export default Profile;
