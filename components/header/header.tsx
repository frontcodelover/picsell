import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/images/logo.jpg';
import { Navigation } from '@/components/menu/navigation';
import { UserNavigation } from '@/components/menu/userNavigation';

const Header = () => {
  return (
    <div className='py-2 border-b'>
      <div className='flex items-center w-[calc(100%-5rem)] m-auto'>
        <div>
          <Link href='/'>
            <Image src={Logo} alt='Logo' className='h-10 w-auto' />
          </Link>
        </div>
        <div className='flex-grow'>
          <Navigation />
        </div>
        <div className='ml-auto'>
          <UserNavigation />
        </div>
      </div>
    </div>
  );
};

export default Header;
