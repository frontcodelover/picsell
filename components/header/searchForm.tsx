import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LuSearch, LuXCircle } from 'react-icons/lu'; // Import de l'icône de recherche
import { Button } from '../ui/button';

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const [focus, setFocus] = useState(false);
  const router = useRouter();
  
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`, undefined, { shallow: true });
    }
  };

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus(); // Met le curseur dans l'input
    }
  }, [focus]);

  return (
    <>
      {/* Ajout d'une classe pour l'animation */}
      <div
        className={`fixed h-screen w-screen bottom-0 left-0 z-50 transition-opacity duration-300 ease-in-out backdrop-blur-md ${
          focus ? 'opacity-100 visible bg-black/80' : 'opacity-0 invisible'
        }`}
      >
        <button
          onClick={() => setFocus(false)}
          className='absolute right-10 top-5 text-4xl text-white'
        >
          <LuXCircle />
        </button>
        <div className='flex items-center justify-center h-full'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-12'>
            <label htmlFor='query' className=' text-white text-center text-5xl tracking-[-.075em]'>
              Rechercher des photos
            </label>
            <div className='flex gap-3'>
              <input
                type='text'
                name='query'
                placeholder='Inde, montagne, mer...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                ref={inputRef}
                className='px-2 py-1 w-96 text-white !border-b-2 bg-transparent !border-b-white !border-transparent !outline-none focus:outline-none focus:ring-0 focus:border-b-black transition-colors'
              />
              <Button type='submit' className='p-2'>
                Rechercher
              </Button>
            </div>
          </form>
        </div>
      </div>

      <button className='p-2' onClick={() => setFocus(true)}>
        <LuSearch className='text-black cursor-pointer h-5 w-5' />
      </button>
    </>
  );
};

export default SearchForm;
