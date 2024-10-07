import React, { useState } from 'react';
import ProfileLayout from '../../../layouts/profile/layout'; // Vérifie que le bon layout est importé
import { useUser } from '@/context/UserContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import useUserAndTranslation from '@/hooks/useUserAndTranslation';
import { supabase } from '@/lib/initSupabase'; // Assurez-vous d'avoir l'instance de Supabase configurée
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Security = () => {
  const user = useUser();
  const [password, setPassword] = useState('');
  const { t } = useUserAndTranslation();
  console.log('usercontexte in Security:', user); // Ceci devrait afficher des logs si le contexte fonctionne

  if (!user) {
    return <div>Utilisateur non trouvé</div>;
  }

  // function pour mettre à jour le mot de passe
  const updatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({
      email: user.email,
      password: password,
    });

    if (error) {
      console.error('Erreur lors de la mise à jour du mot de passe :', error);
    } else {
      alert('Mot de passe mis à jour avec succès !');
    }
  };

  return (
    <ProfileLayout>
      <div className='grid gap-6'>
        <Card key={user?.id} x-chunk='dashboard-04-chunk-1'>
          <CardHeader>
            <CardTitle>{t('userinfo.security')}</CardTitle>
            <CardDescription>{t('userinfo.resetpassword')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={updatePassword}>
              <div className='space-y-4'>
                <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('userinfo.newpassword')} />
                <CardFooter className='border-t py-4'>
                  <Button type='submit'>{t('userinfo.updatepassword')}</Button>
                </CardFooter>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProfileLayout>
  );
};

export default Security;
