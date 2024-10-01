import React from 'react';
import ProfileLayout from './layout'; // Vérifie que le bon layout est importé
import { useUser } from '@/lib/context/UserContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@radix-ui/react-label';

const IsSeller = () => {
  const user = useUser();

  return (
    <ProfileLayout>
      <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
        <div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
          <div className='flex items-center space-x-2'>
            <Switch
              id='is_seller'
              checked={user?.is_seller || false}
              className={`relative inline-flex items-center h-6 w-11 rounded-full ${user?.is_seller ? 'bg-blue-600' : 'bg-gray-200'} transition-colors duration-200 ease-in-out`}
            >
              <span className={`inline-block h-4 w-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${user?.is_seller ? 'translate-x-6' : 'translate-x-1'}`} />
            </Switch>
            <Label htmlFor='is_seller' className='text-gray-900'>
              Vendre mes créations
            </Label>
          </div>
        </div>
      </main>
    </ProfileLayout>
  );
};

export default IsSeller;
