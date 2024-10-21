import React from 'react';
import Link from 'next/link';

const Footer = () => {
  //function pour renvoyer l'année actuelle
  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className='bg-primary-foreground text-white p-4 text-center w-full'>
      <p>&copy; {getYear()} Picsell</p>
      {/*Ajouter des liens classiques des ecommerce*/}
      <div className='flex justify-center space-x-4'>
        <Link href='/'>
          <div className='hover:text-primary'>Home</div>
        </Link>
        <Link href='/about'>
          <div className='hover:text-primary'>About</div>
        </Link>
        <Link href='/contact'>
          <div className='hover:text-primary'>Contact</div>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
