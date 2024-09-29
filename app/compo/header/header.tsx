import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/images/logo.jpg';
import { Navigation } from '@/app/menu/navigation';
import { UserNavigation } from '@/app/menu/UserNavigation';

const Header = () => {
	
  return (
    <div className='pl-5 py-2 border-b border-black-100'>
      <div className='flex items-center'>
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
