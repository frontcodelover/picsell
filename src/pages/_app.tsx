import '../../app/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Header from '@/app/compo/header/header';
import { UserProvider } from '@/lib/context/UserContext'; 

function App({ Component, pageProps }: AppProps) {
	
	return (
     <UserProvider> 
      <Header />
      <div className='m-auto'>
        <Component {...pageProps} />
      </div>
    </UserProvider> 
  );
}
export default appWithTranslation(App);
