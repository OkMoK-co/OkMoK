import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import type { NextPageWithLayout } from '@/pages/_app';
import { socketState } from '@/utils/recoil/socket';
import LoginLayout from '@/components/layout/LoginLayout';
import ShiningButton from '@/components/buttons/ShiningButton';
import { ContentContainer } from '@/styles/common-style';

const Login: NextPageWithLayout = () => {
  const [socket, setSocket] = useRecoilState(socketState);
  const router = useRouter();
  const contentKey = String(router.query.state);
  const contentList: { [key: string]: { [key: string]: string } } = {
    undefined: {
      content: 'Welcome',
      subContent: 'Enjoy your game!',
      buttonValue: 'Enter',
    },
    full: {
      content: 'Room is Full',
      subContent: 'Please try again...',
      buttonValue: 'Re-Enter',
    },
  };

  const connectSocket = () => {
    if (!socket) {
      const newSocket = new WebSocket('ws://localhost:8080');
      setSocket(newSocket);
    }
  };

  return (
    <Container>
      <Section>
        <Content>
          <hr /> <hr />
          {contentList[contentKey].content}
          <hr /> <hr />
        </Content>
        <SubContent>{contentList[contentKey].subContent}</SubContent>
        <ShiningButton
          value={contentList[contentKey].buttonValue}
          moveTo={''}
          clickHandler={connectSocket}
        />
      </Section>
    </Container>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default Login;

const Container = styled(ContentContainer)`
  ${({ theme }) => theme.flexs.centerColumn}
  justify-content: start;
  min-height: calc(100% - (23rem + 6rem + 0.6rem));
  @media (${({ theme: { device } }) => device.mobile}) {
    min-height: calc(100% - (9.1rem + 3.4rem + 0.6rem));
  }
`;

const Section = styled.section`
  ${({ theme }) => theme.flexs.centerColumn}
  width: 70%;
  height: 70%;
  border: ${({ theme }) => `${theme.thick.bold} solid ${theme.colors.green}`};
  color: ${({ theme }) => theme.colors.green};
  letter-spacing: 4px;
  @media (${({ theme: { device } }) => device.mobile}) {
    width: 100%;
    height: 80%;
    margin-top: 2rem;
  }
`;

const Content = styled.h1`
  ${({ theme }) => theme.flexs.center}
  width: 100%;
  margin-bottom: 2rem;
  font-size: ${({ theme }) => theme.fontsizes.xxlarge};
  hr {
    width: 0.7rem;
    margin: 0 0.3rem;
    border: ${({ theme }) => `${theme.thick.thin} solid ${theme.colors.green}`};
  }
  @media (${({ theme: { device } }) => device.mobile}) {
    margin: 1rem 0;
    font-size: ${({ theme }) => theme.fontsizes.xlarge};
  }
`;

const SubContent = styled.h2`
  margin-bottom: 4rem;
  font-size: ${({ theme }) => theme.fontsizes.large};
  color: ${({ theme }) => theme.colors.white};
  @media (${({ theme: { device } }) => device.mobile}) {
    margin-bottom: 2rem;
    font-size: ${({ theme }) => theme.fontsizes.medium};
  }
`;
