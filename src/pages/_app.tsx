import '../../app/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import '@/lib/i18n';
import Header from '@/app/compo/header/header';
import { UserProvider } from '@/lib/context/UserContext';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['100', '300', '400', '500', '700', '900'], // On spécifie les poids que l'on souhaite
  subsets: ['latin'], // Les sous-ensembles de caractères
  display: 'swap', // Utilise swap pour éviter les flashs de texte invisible
});

function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
			<Header />
			<div className={poppins.className}	>
      <div className='m-auto font-poppins'>
        <Component {...pageProps} />
			</div>
			</div>
    </UserProvider>
  );
}
export default appWithTranslation(App);
