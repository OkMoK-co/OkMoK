import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import TimerAndPut from '@/components/game/TimerAndPut';

export default function OmokBoard() {
  const [pointXY, setPointXY] = useState([-1, -1]);
  const pointXYHandler = (x: number, y: number) => {
    setPointXY([x, y]);
  };

  let canvasRef = useRef<HTMLCanvasElement>(null);
  let pointRef = useRef<HTMLCanvasElement>(null);
  let blank = 12.5;
  let width = 375;
  let height = 375;

  const drawBoard = (canvas: HTMLCanvasElement) => {
    let ctx = canvas?.getContext('2d');
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

  const getCoordinate = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!pointRef) return { x: -1, y: -1 };
    let pointCanvas = pointRef.current;
    if (!pointCanvas) return { x: -1, y: -1 };
    return {
      x: Math.floor((event.pageX - pointCanvas.offsetLeft) / 25),
      y: Math.floor((event.pageY - pointCanvas.offsetTop) / 25),
    };
  };

  // const drawOkmok = (event: MouseEvent) => { //진짜 착수할 때
  //   let { x, y } = getCoordinate(event);
  //   if (x < 0 || y < 0) return;
  //   let canvas = canvasRef.current;
  //   if (!canvas) return;
  //   let ctx = canvas.getContext('2d');
  //   if (!ctx) return;
  //   ctx.beginPath();
  //   ctx.strokeStyle = '#00ff00';
  //   ctx.fillStyle = '#00ff00';
  //   ctx.arc(blank + x * 25, blank + y * 25, 10, 0, 2 * Math.PI);
  //   ctx.fill();
  //   ctx.stroke();
  // };

  const drawPoint = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    let { x, y } = getCoordinate(event);
    pointXYHandler(x, y);
    if (x < 0 || y < 0) return;
    let pointCanvas = pointRef.current;
    if (!pointCanvas) return;
    let ctx = pointCanvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.strokeStyle = '#ff00ff';
    ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
    ctx.arc(blank + x * 25, blank + y * 25, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  };

  useEffect(() => {
    if (!canvasRef || !pointRef) return;
    let canvas = canvasRef.current;
    let pointCanvas = pointRef.current;
    if (!canvas || !pointCanvas) return;
    canvas.setAttribute('width', '375');
    canvas.setAttribute('height', '375');
    pointCanvas.setAttribute('width', '375');
    pointCanvas.setAttribute('height', '375');
    drawBoard(canvas);
    // canvas.addEventListener('mousedown', drawOkmok);
    return () => {
      // canvas?.addEventListener('mousedown', drawOkmok);
    };
  }, []);

  return (
    <div>
      <BoardWrap>
        <Canvas ref={canvasRef}>This browser is not supported.</Canvas>
        <PointBoard ref={pointRef} onClick={drawPoint}></PointBoard>
        {/* pointboard는 내차례일 때만 활성화되어야함 */}
      </BoardWrap>
      <TimerAndPut point={pointXY} />
    </div>
  );
}

const BoardWrap = styled.div`
  height: 400px;
`;

const PointBoard = styled.canvas`
  position: absolute;
  z-index: 1;
  &:hover {
    cursor: pointer;
  }
`;
const Canvas = styled.canvas`
  position: absolute;
  z-index: 0;
`;
