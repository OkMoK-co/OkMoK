import { useEffect, useRef } from 'react';

export default function OmokBoard() {
  let canvasRef = useRef<HTMLCanvasElement>(null);
  let blank = 12.5;
  let height = 375;

  const drawBoard = (canvas: HTMLCanvasElement) => {
    let ctx = canvas?.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = '#00ff00';
    for (let i = 0; i < 15; i++) {
      // horizontal line draw
      ctx.beginPath();
      ctx.moveTo(blank + i * 25, blank);
      ctx.lineTo(blank + i * 25, height - blank);
      ctx.stroke();
      // vertical line draw
      ctx.beginPath();
      ctx.moveTo(blank, blank + i * 25);
      ctx.lineTo(height - blank, blank + i * 25);
      ctx.stroke();
    }
  };

  const getCoordinate = (event: MouseEvent) => {
    if (!canvasRef) return { x: -1, y: -1 };
    let canvas = canvasRef.current;
    if (!canvas) return { x: -1, y: -1 };
    return {
      x: Math.floor((event.pageX - canvas.offsetLeft) / 25),
      y: Math.floor((event.pageY - canvas.offsetTop) / 25),
    };
  };

  const drawDol = (event: MouseEvent) => {
    let { x, y } = getCoordinate(event);
    if (x < 0 || y < 0) return;
    let canvas = canvasRef.current;
    if (!canvas) return;
    let ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.strokeStyle = '#00ff00';
    ctx.fillStyle = '#00ff00';
    ctx.arc(blank + x * 25, blank + y * 25, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  };

  useEffect(() => {
    if (!canvasRef) return;
    let canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setAttribute('width', '375');
    canvas.setAttribute('height', '375');
    drawBoard(canvas);
    canvas.addEventListener('mousedown', drawDol);
    return () => {
      canvas?.addEventListener('mousedown', drawDol);
    };
  }, []);

  return <canvas ref={canvasRef}>This browser is not supported.</canvas>;
}
