'use client';
import * as React from 'react';
import Link from 'next/link';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle, NavigationMenuTrigger, NavigationMenuContent } from '@/components/ui/navigation-menu';
import useUserAndTranslation from '@/hooks/useUserAndTranslation';
import { supabase } from '@/lib/initSupabase';
import { LuShoppingCart, LuUser2 } from 'react-icons/lu';

const UserNavigation = () => {
  const { t, currentUserId, ready } = useUserAndTranslation(); // hook de traduction et d'utilisateur
  if (!ready) return null; // Si l'état n'est pas prêt, ne rien afficher

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {currentUserId ? (
          <>
            <NavigationMenuItem>
              {/* Trigger pour le logo profil */}
              <NavigationMenuTrigger className='hover:bg-primary-foreground'>
                <LuUser2 />
              </NavigationMenuTrigger>
              {/* Contenu qui s'affiche lors du survol */}
              <NavigationMenuContent className='p-4 bg-white shadow-md rounded-md'>
                <ul className='space-y-2'>
                  <li>
                    <Link href='/profile/informations' passHref>
                      <NavigationMenuLink className='hover:text-primary'>{t('profile')}</NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <button onClick={logout} className='hover:text-primary'>
                      {t('sign out')}
                    </button>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Shopping Cart Icon */}
            <NavigationMenuItem>
              <Link href='/profile/informations' passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <LuShoppingCart />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </>
        ) : (
          <>
            <NavigationMenuItem className='relative'>
              {/* Trigger pour le logo shopping cart */}
              <NavigationMenuTrigger className='hover:bg-primary-foreground'>
                <LuUser2 />
              </NavigationMenuTrigger>
              {/* Contenu qui s'affiche lors du survol */}
              <NavigationMenuContent className='absolute left-0 mt-1 w-48 p-2 bg-white shadow-md rounded-md'>
                <ul className='space-y-2 m-0 p-2 w-32'>
                  <li>
                    <Link href='/register' passHref>
                      <NavigationMenuLink className='hover:text-primary'>{t('sign up')}</NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href='/login' passHref>
                      <NavigationMenuLink className='hover:text-primary'>{t('login')}</NavigationMenuLink>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/profile/informations' passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <LuShoppingCart />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export { UserNavigation };
