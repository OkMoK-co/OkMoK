import { useRecoilValue } from 'recoil';
import { requestHandler } from '@/socket/requestHandler';
import { socketVar } from '@/socket/variable';
import { roomInfoState, socketState } from '@/utils/recoil/socket';
import styled from 'styled-components';

interface timerAndPutProps {
  point: number[];
  clearPoint: () => void;
}

export default function TimerAndPut({ point, clearPoint }: timerAndPutProps) {
  const { limitTime } = useRecoilValue(roomInfoState);
  const socket = useRecoilValue(socketState);
  const putHandler = () => {
    const [x, y] = point;
    const body = new ArrayBuffer(10);
    const data = new DataView(body);
    data.setInt8(0, x);
    data.setInt8(1, y);
    data.setBigUint64(2, BigInt(0), true);
    socket?.send(requestHandler({ id: socketVar.GAME_PUT_REQUEST, body }));
    clearPoint();
  };

  return (
    <TimerWrap>
      <div>{limitTime}</div>
      <PutButton onClick={putHandler}>put</PutButton>
      <div>{limitTime}</div>
    </TimerWrap>
  );
}

const TimerWrap = styled.div`
  display: flex;
  justify-content: space-around;
  height: 2rem;
  color: white;
`;

const PutButton = styled.button`
  color: black;
  background-color: #00ff00;
  border: solid #00ff00;
  border-radius: 1rem;
  width: 5rem;
  height: 1.5rem;
  &:hover {
    cursor: pointer;
  }
`;
