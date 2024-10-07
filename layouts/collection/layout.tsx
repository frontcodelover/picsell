import React from 'react';
import { CollectionLayoutProps } from '@/types/layout';

const CollectionLayout: React.FC<CollectionLayoutProps> = ({ children }) => {
  return (
    <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
      <div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[50%_1fr] lg:grid-cols-[50%_1fr]'>{children}</div>
    </main>
  );
};

export default CollectionLayout;
