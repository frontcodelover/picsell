"use client";
import * as React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

const UserNavigation = () => {
  const { t } = useTranslation('common'); // 'common' fait référence à common.json

  const [ready, setReady] = useState(false); // Ajout d'un état pour retarder le rendu

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setReady(true); // Indiquer que le composant est prêt à rendre côté client
    }
  }, []);

  if (!ready) return null;

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href='/register' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {t('sign up')}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/login' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {t('login')}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export { UserNavigation };
