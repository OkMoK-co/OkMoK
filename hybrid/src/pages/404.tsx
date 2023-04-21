import styled from 'styled-components';
import { ContentContainer } from '@/styles/common-style';
import ShiningBackground from '@/components/animation/ShiningBackground';
import ShiningButton from '@/components/buttons/ShiningButton';

export default function Page404() {
  return (
    <Container>
      <ShiningBackground />
      <Content>
        <h1> 404 </h1>
        <p> Page Not Found </p>
        <ShiningButton value={'Go Home'} moveTo={'/login'} />
      </Content>
    </Container>
  );
}

const Container = styled(ContentContainer)`
  ${({ theme }) => theme.flexs.center}
`;

const Content = styled.div`
  ${({ theme }) => theme.flexs.centerColumn}

  h1 {
    font-size: 9em;
    line-height: 1.3em;
    margin: 0 auto;
    padding: 0;
    text-shadow: 0 0 1rem #fefefe;
  }

  p {
    max-width: 480px;
    font-size: 1.5em;
    line-height: 1.15em;
    padding: 0 1rem;
    margin: 0 1rem 2rem 1rem;
    text-shadow: 0 0 0.5rem #fefefe;
  }
`;
