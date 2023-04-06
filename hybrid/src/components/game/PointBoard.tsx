import { forwardRef } from 'react';
import styled from 'styled-components';

interface PointBoardProps {
  onClickBoard: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
}

const PointBoard = forwardRef<HTMLCanvasElement, PointBoardProps>(
  ({ onClickBoard }, ref) => {
    return <PointBoardCanvas ref={ref} onClick={onClickBoard} />;
  }
);

const PointBoardCanvas = styled.canvas`
  position: absolute;
  z-index: 1;
  &:hover {
    cursor: pointer;
  }
`;

export default PointBoard;
