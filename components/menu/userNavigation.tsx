'use client';
import React from 'react';
import Link from 'next/link';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle, NavigationMenuTrigger, NavigationMenuContent } from '@/components/ui/navigation-menu';
import useUserAndTranslation from '@/hooks/useUserAndTranslation';
import { supabase } from '@/lib/initSupabase';
import { LuShoppingCart, LuUser2 } from 'react-icons/lu';
import { UseCart } from '@/context/CartContext';

const UserNavigation = () => {
  const { t, ready } = useUserAndTranslation(); // hook de traduction et d'utilisateur
  const { cartItems } = UseCart(); // hook du panier

  if (!ready) return null; // Si l'état n'est pas prêt, ne rien afficher

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  // Fonction pour styliser l'icône du panier si non vide
  const cartStyle = () => {
    return cartItems.length > 0 ? 'relative font-bold' : '';
  };

  // Fonction pour afficher le badge si le panier n'est pas vide
  const renderCartBadge = () => {
    if (cartItems.length > 0) {
      return (
        <span className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center'>
          {cartItems.length}
        </span>
      );
    }
    return null;
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Icone de profil avec menu déroulant */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className='hover:bg-black hover:text-black'>
            <LuUser2 className='h-5 w-5 hover:text-white' />
          </NavigationMenuTrigger>
          <NavigationMenuContent className='p-4 bg-white shadow-md rounded-md'>
            <ul className='space-y-2'>
              <li>
                <Link href='/profile/informations' passHref>
                  <NavigationMenuLink asChild>
                    <div className='hover:text-primary'>{t('profile')}</div>
                  </NavigationMenuLink>
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

        {/* Shopping Cart Icon avec badge */}
        <NavigationMenuItem className='relative'>
          <NavigationMenuLink asChild>
            <Link href='/checkout' passHref>
              <div className={navigationMenuTriggerStyle()}>
                <LuShoppingCart className={`${cartStyle()} h-5 w-5`} />
                {renderCartBadge()}
              </div>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export { UserNavigation };
