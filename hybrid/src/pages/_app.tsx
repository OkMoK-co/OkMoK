import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import GlobalStyle from '@/styles/global-style';
import Layout from '@/components/layout/Layout';

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
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </>
  );
}
