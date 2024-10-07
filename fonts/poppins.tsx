import { Poppins } from 'next/font/google';

export const poppins = Poppins({
  weight: ['100', '300', '400', '500', '700', '900'], // On spécifie les poids que l'on souhaite
  subsets: ['latin'], // Les sous-ensembles de caractères
  display: 'swap', // Utilise swap pour éviter les flashs de texte invisible
});