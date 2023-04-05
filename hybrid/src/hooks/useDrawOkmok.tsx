import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { putInfoState } from '@/utils/recoil/socket';

export default function useDrawOkmok(canvas: HTMLCanvasElement | null) {
  const putInfo = useRecoilValue(putInfoState);
  const blank = 12.5;

  const drawOkmok = (x: number, y: number, color: string) => {
    if (x < 0 || y < 0) return;
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
    const { x, y, player } = putInfo;
    const color = player === 1 ? '#00ff00' : '#ff00ff';
    drawOkmok(x, y, color);
  }, [putInfo]);
}
