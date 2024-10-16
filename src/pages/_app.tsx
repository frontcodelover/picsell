import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import '@/lib/i18n';
import Header from '@/components/header/header';
import { UserProvider } from '@/context/UserContext';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/footer/footer';
import { CartProvider } from '@/context/CartContext';


function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <CartProvider>
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
      </CartProvider>
    </UserProvider>
  );
}
export default appWithTranslation(App);
