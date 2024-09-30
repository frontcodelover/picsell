import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/initSupabase';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@radix-ui/react-label';
import Link from 'next/link';

import Menu from '@/app/menu/profiles/menu';

const Profile = () => {
  const router = useRouter();
  const [currentUserId, setCurrentUserId] = useState<string | null>('');
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUserId = localStorage.getItem('currentUserId');
    if (!currentUserId) {
      router.push('/login');
    }
    setCurrentUserId(currentUserId);

    const fetchUserCurrentUser = async () => {
      const { data: profile, error } = await supabase.from('profiles').select('*').eq('user_id', currentUserId);
      if (error) {
        console.error('Error fetching role:', error);
        return;
      }
      if (profile) {
        console.log('infos', profile);
        setUser(profile);
        setLoading(false);
      }
    };
    fetchUserCurrentUser();
  }, [currentUserId]);

  console.log('user', user);
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
                <div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
                 <Menu />
                  <div className='grid gap-6'>
                    {user.map((item: any, index: number) => (
                      <Card key={index} x-chunk='dashboard-04-chunk-1'>
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
                                  placeholder={item.firstname ?? 'a renseigner'}
                                  defaultValue={item.firstname}
                                  // Ajoutez un onChange ici si vous souhaitez que les champs soient contrôlés
                                />
                              </div>
                              <div>
                                <Label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                                  Nom
                                </Label>
                                <Input
                                  id='name'
                                  placeholder={item.name ?? 'a renseigner'}
                                  defaultValue={item.name}
                                  // Ajoutez un onChange ici si nécessaire
                                />
                              </div>
                              <div>
                                <Label htmlFor='pseudo' className='block text-sm font-medium text-gray-700'>
                                  Pseudo
                                </Label>
                                <Input
                                  id='pseudo'
                                  placeholder={item.pseudo ?? 'a renseigner'}
                                  defaultValue={item.pseudo}
                                  // Ajoutez un onChange ici si nécessaire
                                />
                              </div>
                              <div>
                                <Label htmlFor='adress' className='block text-sm font-medium text-gray-700'>
                                  Adresse
                                </Label>
                                <Input
                                  id='adress'
                                  placeholder={item.adress ?? 'a renseigner'}
                                  defaultValue={item.adress}
                                  // Ajoutez un onChange ici si nécessaire
                                />
                              </div>
                              <div>
                                <Label htmlFor='city' className='block text-sm font-medium text-gray-700'>
                                  Ville
                                </Label>
                                <Input
                                  id='city'
                                  placeholder={item.city ?? 'a renseigner'}
                                  defaultValue={item.city}
                                  // Ajoutez un onChange ici si nécessaire
                                />
                              </div>
                              <div>
                                <Label htmlFor='zipcode' className='block text-sm font-medium text-gray-700'>
                                  Code postal
                                </Label>
                                <Input
                                  id='zipcode'
                                  placeholder={item.zipcode ?? 'a renseigner'}
                                  defaultValue={item.zipcode}
                                  // Ajoutez un onChange ici si nécessaire
                                />
                              </div>
                              <div>
                                <Label htmlFor='instagram' className='block text-sm font-medium text-gray-700'>
                                  Instagram
                                </Label>
                                <Input
                                  id='instagram'
                                  placeholder={item.instagram ?? 'a renseigner'}
                                  defaultValue={item.instagram}
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
                    ))}
                  </div>
                </div>
              </main>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;