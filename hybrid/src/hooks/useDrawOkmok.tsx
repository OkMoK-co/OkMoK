import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { gameInfoState, putInfoState } from '@/utils/recoil/socket';
import { CANVAS_HEIGHT, CANVAS_WIDTH, BLANK } from '@/utils/constants';

export default function useDrawOkmok() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointRef = useRef<HTMLCanvasElement | null>(null);
  const putInfo = useRecoilValue(putInfoState);
  const { startTime } = useRecoilValue(gameInfoState);
  const [pointXY, setPointXY] = useState<number[]>([-1, -1]);
  const initBoard = Array.from(Array(15), () => new Array(15).fill(0));
  const [board, setBoard] = useState<number[][]>(initBoard);
  const [isStart, setIsStart] = useState<boolean>(false);

  useEffect(() => {
    setIsStart(!!startTime);
    clearPointCanvas();
  }, [startTime]);
  useEffect(() => {
    if (!isStart) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    setBoard(initBoard);
    drawBoard(canvas);
  }, [isStart]);

  const getCoordinate = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const pointCanvas = pointRef.current;
    if (!pointCanvas) return { x: -1, y: -1 };
    return {
      x: Math.floor((event.pageX - pointCanvas.offsetLeft) / 25),
      y: Math.floor((event.pageY - pointCanvas.offsetTop) / 25),
    };
  };

  const drawPoint = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const ctx = pointRef.current?.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCoordinate(event);
    if (x < 0 || y < 0) return;
    if (board[y][x]) return;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.beginPath();
    ctx.strokeStyle = '#ffff00';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.arc(BLANK + x * 25, BLANK + y * 25, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    setPointXY([x, y]);
  };

  const clearPointCanvas = () => {
    const ctx = pointRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    setPointXY([-1, -1]);
  };

  const drawOkmok = (x: number, y: number, color: string) => {
    if (x < 0 || y < 0) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.arc(BLANK + x * 25, BLANK + y * 25, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    clearPointCanvas();
  };

  /**
   * @description draw board
   */
  const drawBoard = (canvas: HTMLCanvasElement) => {
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = '#00ff00';
    for (let i = 0; i < 15; i++) {
      // vertical line draw
      ctx.beginPath();
      ctx.moveTo(BLANK + i * 25, BLANK);
      ctx.lineTo(BLANK + i * 25, CANVAS_HEIGHT - BLANK);
      ctx.stroke();
      // horizontal line draw
      ctx.beginPath();
      ctx.moveTo(BLANK, BLANK + i * 25);
      ctx.lineTo(CANVAS_HEIGHT - BLANK, BLANK + i * 25);
      ctx.stroke();
    }
  };

  useEffect(() => {
    const { x, y, player } = putInfo;
    const color = player === 1 ? '#00ff00' : '#ff00ff';
    drawOkmok(x, y, color);
    if (x > -1 && y > -1) {
      setBoard((cur) => {
        let newBoard = [...cur];
        newBoard[y][x] = player;
        return newBoard;
      });
    }
  }, [putInfo]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const pointCanvas = pointRef.current;
    if (!canvas || !pointCanvas) return;
    canvas.setAttribute('width', '375');
    canvas.setAttribute('height', '375');
    pointCanvas.setAttribute('width', '375');
    pointCanvas.setAttribute('height', '375');
    drawBoard(canvas);
  }, []);

  return { drawPoint, pointXY, canvasRef, pointRef };
}
