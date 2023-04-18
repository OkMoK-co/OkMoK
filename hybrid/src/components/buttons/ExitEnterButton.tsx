import styled from 'styled-components';

interface ExitEnterButtonProps {
  value: any;
  color: string;
  clickHandler?: () => void;
}

export default function ExitEnterButton({
  value,
  color,
  clickHandler,
}: ExitEnterButtonProps) {
  return (
    <Button color={color} onClick={clickHandler}>
      {value}
    </Button>
  );
}

const Button = styled.button<{ color: string }>`
  ${({ theme }) => theme.flexs.center};
  width: 3.5rem;
  height: 1.8rem;
  border-radius: ${({ theme }) => theme.radiuses.big};
  border: ${({ color, theme }) =>
    `${theme.thick.thin} solid ${theme.colors[color]}`};
  color: ${({ color, theme }) => theme.colors[color]};
  &:hover {
    color: ${({ theme }) => theme.colors.black};
    background-color: ${({ color, theme }) => theme.colors[color]};
  }
  @media (${({ theme: { device } }) => device.mobile}) {
    width: 3rem;
    height: 1.5rem;
  }
`;
