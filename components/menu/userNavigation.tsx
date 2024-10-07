'use client';
import * as React from 'react';
import Link from 'next/link';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import useUserAndTranslation from '@/hooks/useUserAndTranslation';
import { supabase } from '@/lib/initSupabase';

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
              <Link href='/profile/informations' legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>{t('profile')}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <button onClick={logout} className={navigationMenuTriggerStyle()}>
                {t('sign out')}
              </button>
            </NavigationMenuItem>
          </>
        ) : (
          <>
            <NavigationMenuItem>
              <Link href='/register' legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>{t('sign up')}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/login' legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>{t('login')}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export { UserNavigation };
