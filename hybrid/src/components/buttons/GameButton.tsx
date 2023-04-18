import styled from 'styled-components';

interface GameButtonProps {
  active: boolean;
  color: string;
  value: any;
  clickHandler: () => void;
}

export default function GameButton({
  active,
  color,
  value,
  clickHandler,
}: GameButtonProps) {
  return (
    <Button active={active} color={color} onClick={clickHandler}>
      {value}
    </Button>
  );
}

const Button = styled.button<{ active: boolean; color: string }>`
  ${({ theme }) => theme.flexs.center};
  width: 5rem;
  height: 1.5rem;
  border-radius: ${({ theme }) => theme.radiuses.small};
  border: solid
    ${({ active, color, theme }) =>
      active ? theme.colors[color] : theme.colors.darkgray};
  color: ${({ active, color, theme }) =>
    active ? theme.colors[color] : theme.colors.darkgray};
  background-color: black;
  &:hover {
    cursor: pointer;
  }
`;
