import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Menu = () => {
  const router = useRouter();

  console.log('Router', router);

  const isActive = (path: string) => {
		return router.pathname == path;
  };
	console.log('Path', isActive('/profile/informations'));

  console.log('Menu is rendered', isActive);

  return (
		<nav className='grid gap-4 text-sm text-muted-foreground'>
      <Link href='/profile/informations' className={`${isActive('/profile/informations') ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
        Informations
      </Link>
      <Link href='/profile/security' className={`${isActive('/profile/security') ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
        Sécurité
      </Link>
      <Link href='/profile/seller' className={`${isActive('/profile/seller') ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
        Vendre vos impressions
      </Link>
      <Link href='/profile/buyer' className={`${isActive('/profile/buyer') ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
        Vos achats
      </Link>
      <Link href='/profile/favorite' className={`${isActive('/profile/favorite') ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
        Favoris
      </Link>
    </nav>
  );
};

export default Menu;
