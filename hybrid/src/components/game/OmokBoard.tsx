import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import TimerAndPut from '@/components/game/TimerAndPut';
import { useRecoilValue } from 'recoil';
import { putInfoState } from '@/utils/recoil/socket';
import PointBoard from './PointBoard';

export default function OmokBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pointXY, setPointXY] = useState<number[]>([-1, -1]);
  const putInfo = useRecoilValue(putInfoState);
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

  const drawOkmok = (x: number, y: number, color: string) => {
    if (x < 0 || y < 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.arc(blank + x * 25, blank + y * 25, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  };

  useEffect(() => {
    if (!canvasRef) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setAttribute('width', '375');
    canvas.setAttribute('height', '375');
    drawBoard(canvas);
  }, []);

  useEffect(() => {
    const { x, y, player } = putInfo;
    const color = player === 1 ? '#00ff00' : '#ff00ff';
    drawOkmok(x, y, color);
  }, [putInfo]);

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
