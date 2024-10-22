import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/initSupabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Requête invalide' });
  }

  // Recherche dans Supabase pour les photos correspondant à la query
  const { data: photos, error } = await supabase.from('photos').select('*').ilike('title', `%${query}%`);

  if (error) {
    return res.status(500).json({ error: 'Erreur lors de la recherche' });
  }

  return res.status(200).json(photos);
}
