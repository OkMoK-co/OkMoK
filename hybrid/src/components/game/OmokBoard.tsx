import styled from 'styled-components';
import TimerAndPut from '@/components/game/TimerAndPut';
import PointBoard from './PointBoard';
import useDrawOkmok from '@/hooks/useDrawOkmok';

export default function OmokBoard() {
  const { drawPoint, pointXY, canvasRef, pointRef, clearPoint } =
    useDrawOkmok();

  return (
    <div>
      <BoardWrap>
        <Canvas ref={canvasRef}>This browser is not supported.</Canvas>
        <PointBoard ref={pointRef} onClickBoard={drawPoint} />
        {/* pointboard는 내차례일 때만 활성화되어야함 */}
      </BoardWrap>
      <TimerAndPut point={pointXY} clearPoint={clearPoint} />
    </div>
  );
}

const BoardWrap = styled.div`
  height: 400px;
`;

const Canvas = styled.canvas`
  position: absolute;
  z-index: 0;
`;
