import styled from 'styled-components';

interface PlayPutButtonProps {
  active: boolean;
  value: string;
  clickHandler: () => void;
}

export default function PlayPutButton({
  active,
  value,
  clickHandler,
}: PlayPutButtonProps) {
  return (
    <Button active={active} onClick={clickHandler}>
      {value}
    </Button>
  );
}

const Button = styled.button<{ active: boolean }>`
  ${({ theme }) => theme.flexs.center}
  height: 90%;
  width: 10rem;
  border-radius: ${({ theme }) => theme.radiuses.big};
  border: ${({ theme }) => `${theme.thick.bold} solid ${theme.colors.green}`};
  background-color: ${({ theme }) => theme.colors.green};
  letter-spacing: 2px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.black};
  }
  @media (${({ theme: { device } }) => device.mobile}) {
    width: 7rem;
    border: ${({ theme }) =>
      `${theme.thick.middle} solid ${theme.colors.green}`};
  }
`;
