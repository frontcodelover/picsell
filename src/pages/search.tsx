import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PhotoSearch } from '@/types/photographers';

export default function SearchPage() {
  const router = useRouter();
  const { query } = router.query; // Récupère la query depuis l'URL

  const [results, setResults] = useState<PhotoSearch[]>([]);

  useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        const res = await fetch(`/api/search?query=${encodeURIComponent(query as string)}`);
        const photos = await res.json();
        setResults(photos);
      };

      fetchResults();
    }
  }, [query]); // La query est mise à jour lorsque l'URL change, même avec shallow routing

  return (
    <div className='search-results-container'>
      <h1>Résultats de la recherche : {query}</h1>
      {results.length > 0 ? (
        <ul>
          {results.map((photo) => (
            <li key={photo.id}>
              <h3>{photo.title}</h3>
              <p>{photo.description}</p>
              <img src={photo.url} alt={photo.title} width='200' />
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun résultat trouvé</p>
      )}
    </div>
  );
}
