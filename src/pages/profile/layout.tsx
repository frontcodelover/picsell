import React, { ReactNode } from 'react';
import Menu from '@/app/menu/profiles/menu';
import { UserProvider } from '@/lib/context/UserContext';

interface ProfileLayoutProps {
  children: ReactNode;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
  console.log('ProfileLayout rendered'); // Ajoute un log pour vérifier que le layout est rendu
  return (
    <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
      <div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
        <Menu />
        {children}
      </div>
    </main>
  );
};

export default ProfileLayout;
