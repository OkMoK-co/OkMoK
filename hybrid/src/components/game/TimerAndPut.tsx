import { useRecoilValue } from 'recoil';
import { roomInfoState } from '@/utils/recoil/socket';
import { socketVar } from '@/socket/variable';
import { useRequest } from '@/hooks/useRequest';
import styled from 'styled-components';

interface timerAndPutProps {
  point: number[];
}

export default function TimerAndPut({ point }: timerAndPutProps) {
  const { limitTime } = useRecoilValue(roomInfoState);

  const makePutBody = () => {
    const [x, y] = point;
    const body = new ArrayBuffer(10);
    const data = new DataView(body);
    data.setInt8(0, x);
    data.setInt8(1, y);
    data.setBigUint64(2, BigInt(0), true);
    return body;
  };

  const putHandler = useRequest({
    id: socketVar.GAME_PUT_REQUEST,
    body: makePutBody(),
  });

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
