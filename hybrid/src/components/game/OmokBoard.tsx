import styled from 'styled-components';
import TimerAndPut from '@/components/game/TimerAndPut';
import PointBoard from './PointBoard';
import useDrawOkmok from '@/hooks/useDrawOkmok';
import useTurn from '@/hooks/useTurn';
import { CANVAS_SIZE } from '@/utils/constants';

export default function OmokBoard() {
  const { drawPoint, pointXY, canvasRef, pointRef } = useDrawOkmok();
  const { isMyTurn } = useTurn();

  return (
    <Container>
      <BoardWrap>
        <Canvas ref={canvasRef}>This browser is not supported.</Canvas>
        <PointBoard ref={pointRef} active={isMyTurn} onClickBoard={drawPoint} />
      </BoardWrap>
      <TimerAndPut active={isMyTurn} point={pointXY} />
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => theme.flexs.centerColumn};
`;

const BoardWrap = styled.div`
  height: ${CANVAS_SIZE}px;
  width: ${CANVAS_SIZE}px;
  margin-bottom: 1rem;
`;

const Canvas = styled.canvas`
  position: absolute;
  z-index: 0;
`;
