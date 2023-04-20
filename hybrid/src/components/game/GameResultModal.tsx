import styled from 'styled-components';

interface GameResultModalProps {
  result: number;
  onClickModal: () => void;
}

export default function GameResultModal({
  result,
  onClickModal,
}: GameResultModalProps) {
  const content = ['Win', 'Lose', 'Draw'];
  return (
    <GameResultWrap>
      <GameResultDiv onClick={onClickModal} result={result}>
        <div>you</div>
        <div>{content[result - 1]}</div>
      </GameResultDiv>
    </GameResultWrap>
  );
}

const GameResultWrap = styled.div`
  ${({ theme }) => theme.flexs.center};
  z-index: 100;
  width: 375px;
  height: 375px;
  margin-bottom: -375px;
  align-items: center;
`;

const GameResultDiv = styled.div<{ result: number }>`
  ${({ theme }) => theme.flexs.centerColumn};
  width: 15rem;
  height: 10rem;
  background-color: rgba(0, 0, 0, 0.7);
  border: solid
    ${({ theme, result }) => {
      if (result === 1) return theme.colors.aqua;
      else if (result === 2) return theme.colors.fucia;
      else return theme.colors.yellow;
    }};
  &:hover {
    cursor: pointer;
  }
`;
