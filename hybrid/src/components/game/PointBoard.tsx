import { forwardRef } from 'react';
import styled from 'styled-components';

interface PointBoardProps {
  active: boolean;
  onClickBoard: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
}

const PointBoard = forwardRef<HTMLCanvasElement, PointBoardProps>(
  ({ active, onClickBoard }, ref) => {
    return (
      <PointBoardCanvas active={active} ref={ref} onClick={onClickBoard} />
    );
  }
);

const PointBoardCanvas = styled.canvas<{ active: boolean }>`
  position: absolute;
  z-index: 2;
  pointer-events: ${({ active }) => (active ? 'auto' : 'none')};
  &:hover {
    cursor: ${({ active }) => (active ? 'pointer' : 'default')};
  }
`;

export default PointBoard;
