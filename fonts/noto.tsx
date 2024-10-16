import { Noto_Sans } from 'next/font/google';

export const noto = Noto_Sans({
  weight: ['100', '300', '400', '500', '700', '800', '900'], // On spécifie les poids que l'on souhaite
  subsets: ['latin'], // Les sous-ensembles de caractères
  display: 'swap', // Utilise swap pour éviter les flashs de texte invisible
});
