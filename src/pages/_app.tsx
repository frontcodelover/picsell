import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import '@/lib/i18n';
import Header from '@/components/header/header';
import { UserProvider } from '@/context/UserContext';
import { poppins } from '@/fonts/poppins';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/footer/footer';

function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <div className='flex flex-col min-h-screen'>
        {' '}
        {/* Utilisation de flexbox sur toute la hauteur */}
        <Header />
        <main className='flex-1'>
          {' '}
          {/* Flex-1 pour prendre tout l'espace disponible */}
          <Component {...pageProps} />
        </main>
        <Toaster />
        <Footer />
      </div>
    </UserProvider>
  );
}
export default appWithTranslation(App);
