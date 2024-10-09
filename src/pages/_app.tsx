import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import '@/lib/i18n';
import Header from '@/components/header/header';
import { UserProvider } from '@/context/UserContext';
import { poppins } from '@/fonts/poppins';
import { Toaster } from '@/components/ui/toaster';


function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Header />
      <div className={poppins.className}>
        <div className='m-auto font-poppins'>
          <Component {...pageProps} />
        </div>
			</div>
			<Toaster />
    </UserProvider>
  );
}
export default appWithTranslation(App);
