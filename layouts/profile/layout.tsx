import React from 'react';
import Menu from '@/components/menu/profiles/menu';
import { ProfileLayoutProps } from '@/types/layout';

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
  return (
    <main className='min-h-[calc(100vh-4rem)] flex items-start justify-center p-4'>
      <div className='flex w-full max-w-6xl gap-6 py-8'>
				<Menu />
        {children}
      </div>
    </main>
  );
};

export default ProfileLayout;
