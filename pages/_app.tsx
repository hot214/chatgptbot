import '@/styles/base.css';
import '@/styles/global.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Layout from '../components/layout';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
