import styled from 'styled-components';
import { CANVAS_SIZE } from '@/utils/constants';

interface GameResultModalProps {
  result: number;
  onClickModal: () => void;
}

export default function GameResultModal({
  result,
  onClickModal,
}: GameResultModalProps) {
  const content = [{ Win: 'aqua' }, { Lose: 'fucia' }, { Draw: 'yellow' }];
  return (
    <>
      <ModalBackDrop onClick={onClickModal} />
      <GameResultWrap>
        <GameResultDiv
          onClick={onClickModal}
          color={Object.values(content[result - 1])[0]}
        >
          <div>you</div>
          <div>{Object.keys(content[result - 1])[0]}</div>
        </GameResultDiv>
      </GameResultWrap>
    </>
  );
}

const ModalBackDrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
`;

const GameResultWrap = styled.div`
  ${({ theme }) => theme.flexs.center};
  width: ${CANVAS_SIZE}px;
  height: ${CANVAS_SIZE}px;
  margin-bottom: -${CANVAS_SIZE}px;
  align-items: center;
`;

const GameResultDiv = styled.div<{ color: string }>`
  ${({ theme }) => theme.flexs.centerColumn};
  width: 15rem;
  height: 10rem;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.7);
  border: solid ${({ theme, color }) => theme.colors[color]};
  &:hover {
    cursor: pointer;
  }
`;
