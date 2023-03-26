import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import GlobalStyle from '@/styles/global-style';
import Layout from '@/components/layout/Layout';
import SocketConnect from '@/components/layout/SocketConnect';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        <title>OkMoK</title>
        <meta name='description' content='OkMoK와 즐거운 오목생활' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <RecoilRoot>
        <SocketConnect>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </SocketConnect>
      </RecoilRoot>
    </>
  );
}
