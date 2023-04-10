import { useRecoilValue } from 'recoil';
import { socketVar } from '@/socket/variable';
import { useRequest } from '@/hooks/useRequest';
import { gameInfoState, roomInfoState } from '@/utils/recoil/socket';
import styled from 'styled-components';

interface timerAndPutProps {
  active: boolean;
  point: number[];
}

export default function TimerAndPut({ active, point }: timerAndPutProps) {
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
      <PutButton active={active} onClick={putHandler} disabled={!active}>
        put
      </PutButton>
      <div>{limitTime}</div>
    </TimerWrap>
  );
}

const TimerWrap = styled.div`
  display: flex;
  justify-content: space-around;
  height: 2rem;
  color: white;
  background-color: black;
  border-radius: 1rem;
  border: solid white;
`;

const PutButton = styled.button<{ active: boolean }>`
  color: black;
  background-color: ${(props) => (props.active ? '#00ff00' : '#808080')};
  border: none;
  border-radius: 1rem;
  width: 5rem;
  height: 1.5rem;
  &:hover {
    cursor: ${(props) => (props.active ? 'pointer' : 'default')};
  }
`;
