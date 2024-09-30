import React from 'react';
import Link from 'next/link';

const Menu = () => {
  return (
    <nav className='grid gap-4 text-sm text-muted-foreground' x-chunk='dashboard-04-chunk-0'>
      <Link href='/profile' className='font-semibold text-primary'>
        Informations
      </Link>
      <Link href='/profile/security'>Sécurité</Link>
      <Link href='/profile/seller'>Vendre vos impressions</Link>
      <Link href='/profile/buyer'>Vos achats</Link>
      <Link href='/profile/favorite'>Favoris</Link>
    </nav>
  );
};

export default Menu;
