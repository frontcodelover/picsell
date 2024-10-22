import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { LuSearch } from 'react-icons/lu'; // Import de l'icône de recherche

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire

    if (query.trim()) {
      // Utilisation de shallow routing pour changer l'URL sans recharger la page
      router.push(`/search?query=${encodeURIComponent(query)}`, undefined, { shallow: true });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex'>
      <input
				type='text'
        name='query'
        placeholder='Rechercher des photos...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='
				px-2 
				py-1 
				!border-b-2 
			!border-b-black  
				!border-transparent 
				!outline-none      
				focus:outline-none 
				focus:ring-0      
				focus:border-b-black
				transition-colors  
			'
      />
      <button type='submit' className='p-2'>
        <LuSearch className='text-black cursor-pointer h-5 w-5' />
      </button>
    </form>
  );
};

export default SearchForm;
