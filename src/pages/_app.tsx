import '../../app/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Header from '@/app/compo/header/header';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <div className='m-auto'>
        <Component {...pageProps} />
      </div>
    </>
  );
}
export default appWithTranslation(App);
