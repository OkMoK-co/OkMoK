import styled from 'styled-components';
import TimerAndPut from '@/components/game/TimerAndPut';
import PointBoard from './PointBoard';
import useDrawOkmok from '@/hooks/useDrawOkmok';
import useGame from '@/hooks/useGame';

export default function OmokBoard() {
  const { drawPoint, pointXY, canvasRef, pointRef } = useDrawOkmok();
  const { isMyTurn } = useGame();

  return (
    <div>
      <BoardWrap>
        <Canvas ref={canvasRef}>This browser is not supported.</Canvas>
        <PointBoard
          ref={pointRef}
          active={isMyTurn()}
          onClickBoard={drawPoint}
        />
      </BoardWrap>
      <TimerAndPut active={isMyTurn()} point={pointXY} />
    </div>
  );
}

const BoardWrap = styled.div`
  height: 400px;
`;

const Canvas = styled.canvas`
  position: absolute;
  z-index: 0;
  background-color: black;
`;
