import styled from 'styled-components';

export default function Footer() {
  return (
    <Container>
      <p>GitHub | Rule | Contact</p>
      <p>Copyright © 2023 OkMoK. All rights reserved.</p>
    </Container>
  );
}

const Container = styled.footer`
  ${({ theme }) => theme.flexs.centerColumn};
  height: 3rem;
  margin: 1.5rem;
  font-size: ${({ theme }) => theme.fontsizes.medium};
  @media (${({ theme }) => theme.device.mobile}) {
    margin: 0.2rem;
    font-size: ${({ theme }) => theme.fontsizes.small};
  }
`;
