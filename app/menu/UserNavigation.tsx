'use client';
import * as React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { supabase } from '@/lib/initSupabase';

const UserNavigation = () => {
	const { t } = useTranslation('common'); // 'common' fait référence à common.json
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [ready, setReady] = useState(false); // Ajout d'un état pour retarder le rendu
	
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setReady(true); // Indiquer que le composant est prêt à rendre côté client
      const storageUserId = localStorage.getItem('currentUserId');
      setCurrentUserId(storageUserId);
    }

    // Écouter les changements d'état d'authentification
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const userId = session.user.id;
        localStorage.setItem('currentUserId', userId);
        setCurrentUserId(userId);
      } else if (event === 'SIGNED_OUT') {
        localStorage.removeItem('currentUserId');
        setCurrentUserId(null);
      }
    });

    // Nettoyer l'écouteur d'événements
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

	if (!ready) return null;
	
	const logout = async () => {
		await supabase.auth.signOut()
		window.location.href = '/login'
		setCurrentUserId(null);
		localStorage.removeItem('currentUserId');
		localStorage.removeItem('user');
	}

	console.log('current user',currentUserId);

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
