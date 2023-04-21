import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 75rem;
  max-width: 75rem;
  margin: 0 auto;
  padding: 0.3rem 1.5rem;
  border-right: ${({ theme }) =>
    `${theme.thick.bold} dashed ${theme.colors.fucia}`};
  border-left: ${({ theme }) =>
    `${theme.thick.bold} dashed ${theme.colors.fucia}`};
  @media (${({ theme: { device } }) => device.mobile}) {
    width: 100%;
    border: none;
  }
`;

/** min-height: calc(100% - ${headerHeight + footerHeight + layoutMargin}rem) */
export const ContentContainer = styled.main`
  width: calc(75rem - 30rem);
  min-height: calc(100% - (8rem + 6rem + 0.6rem));
  font-size: ${({ theme }) => theme.fontsizes.large};
  @media (${({ theme: { device } }) => device.mobile}) {
    width: 100%;
    min-height: calc(100% - (4.1rem + 3.4rem + 0.6rem));
    font-size: ${({ theme }) => theme.fontsizes.medium};
  }
`;
