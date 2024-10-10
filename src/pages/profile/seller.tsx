import React, { useEffect, useState } from 'react';
import ProfileLayout from '../../../layouts/profile/layout'; // Vérifie que le bon layout est importé
import { useUser } from '@/context/UserContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@radix-ui/react-label';
import { supabase } from '@/lib/initSupabase';
import Collections from '../seller/collection/allcollections';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import useUserAndTranslation from '@/hooks/useUserAndTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';

const IsSeller = () => {
  const user = useUser();
  const { t } = useUserAndTranslation();
  const [isSeller, setIsSeller] = useState(user?.is_seller || false);
	const router = useRouter();
	console.log("ROUTTER", router);

  // Mettre à jour le switch avec un boolean is_seller
  const updateIsSeller = async (checked: boolean) => {
    const { error } = await supabase
      .from('users')
      .update({
        is_seller: checked,
      })
      .eq('id', user?.id);

    if (error) {
      console.error('Erreur lors de la mise à jour du profil :', error);
    } else {
      setIsSeller(checked);
    }
  };

  useEffect(() => {
    if (!user) return;

    // Mettre à jour l'état local lorsque les infos de l'utilisateur changent
    setIsSeller(user.is_seller);
  }, [user]);

  return (
    <ProfileLayout>
      <main className='flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
        <div className='mx-auto grid w-full max-w-6xl items-start gap-6 '>
          <div className='flex items-center space-x-2'>
            <Switch
              id='is_seller'
              className={`relative inline-flex items-center h-6 w-11 rounded-full ${isSeller ? 'bg-blue-600' : 'bg-gray-200'} transition-colors duration-200 ease-in-out`}
              checked={isSeller} // Utilisation de l'état local isSeller ici
              onCheckedChange={updateIsSeller}
            >
              <span className={`inline-block h-4 w-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${isSeller ? 'translate-x-6' : 'translate-x-1'}`} />
            </Switch>
            <Label htmlFor='is_seller' className='text-gray-900'>
              {isSeller ? 'Vente de mes photos' : 'Activer la vente de mes photos'}
            </Label>
          </div>
        </div>
				{isSeller ? (
          <Link href={`/photographe/${user?.username}/edit`}><Button>Modifier mon profil</Button></Link>
						) : <></>}
      </main>
    </ProfileLayout>
  );
};

export default IsSeller;
