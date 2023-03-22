import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import LoginLayout from '@/components/layout/LoginLayout';

const Login: NextPageWithLayout = () => {
  return (
    <main>
      <h1>- - Welcome - -</h1>
      <h2>Enjoy your game!</h2>
      <button>Enter ...</button>
    </main>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default Login;
