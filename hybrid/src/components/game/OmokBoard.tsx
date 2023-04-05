import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import TimerAndPut from '@/components/game/TimerAndPut';
import PointBoard from './PointBoard';
import useDrawOkmok from '@/hooks/useDrawOkmok';

export default function OmokBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  useDrawOkmok(canvas);
  const [pointXY, setPointXY] = useState<number[]>([-1, -1]);
  const pointXYHandler = (x: number, y: number) => {
    setPointXY([x, y]);
  };

  const blank = 12.5;
  const height = 375;

  const drawBoard = (canvas: HTMLCanvasElement) => {
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = '#00ff00';
    for (let i = 0; i < 15; i++) {
      // vertical line draw
      ctx.beginPath();
      ctx.moveTo(blank + i * 25, blank);
      ctx.lineTo(blank + i * 25, height - blank);
      ctx.stroke();
      // horizontal line draw
      ctx.beginPath();
      ctx.moveTo(blank, blank + i * 25);
      ctx.lineTo(height - blank, blank + i * 25);
      ctx.stroke();
    }
  };

  useEffect(() => {
    if (!canvasRef) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setAttribute('width', '375');
    canvas.setAttribute('height', '375');
    drawBoard(canvas);
  }, []);

  return (
    <div>
      <BoardWrap>
        <Canvas ref={canvasRef}>This browser is not supported.</Canvas>
        <PointBoard pointXYHandler={pointXYHandler} />
        {/* pointboard는 내차례일 때만 활성화되어야함 */}
      </BoardWrap>
      <TimerAndPut point={pointXY} />
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
