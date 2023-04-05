import { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface pointBoardProps {
  pointXYHandler: (x: number, y: number) => void;
}

export default function PointBoard({ pointXYHandler }: pointBoardProps) {
  const pointRef = useRef<HTMLCanvasElement>(null);
  const blank = 12.5;
  const width = 375;
  const height = 375;

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
    const pointCanvas = pointRef.current;
    if (!pointCanvas) return;
    const ctx = pointCanvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCoordinate(event);
    if (x < 0 || y < 0) return;
    pointXYHandler(x, y);
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.strokeStyle = '#ff00ff';
    ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
    ctx.arc(blank + x * 25, blank + y * 25, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  };

  useEffect(() => {
    if (!pointRef) return;
    let pointCanvas = pointRef.current;
    if (!pointCanvas) return;
    pointCanvas.setAttribute('width', '375');
    pointCanvas.setAttribute('height', '375');
  }, []);
  return (
    <PointBoardCanvas ref={pointRef} onClick={drawPoint}></PointBoardCanvas>
  );
}

const PointBoardCanvas = styled.canvas`
  position: absolute;
  z-index: 1;
  &:hover {
    cursor: pointer;
  }
`;
