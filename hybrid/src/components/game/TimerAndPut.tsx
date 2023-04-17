import styled from 'styled-components';
import { socketVar } from '@/socket/variable';
import { useRequest } from '@/hooks/useRequest';
import Timer from '@/components/game/Timer';

interface timerAndPutProps {
  active: boolean;
  point: number[];
}

export default function TimerAndPut({ active, point }: timerAndPutProps) {
  const makePutBody = () => {
    const [x, y] = point;
    const cur = new Date();
    const utc = cur.getTime() + cur.getTimezoneOffset() * 60 * 1000;
    const body = new ArrayBuffer(10);
    const data = new DataView(body);
    data.setInt8(0, x);
    data.setInt8(1, y);
    data.setBigUint64(2, BigInt(utc), true);
    return body;
  };

  const putHandler = useRequest({
    id: socketVar.GAME_PUT_REQUEST,
    body: makePutBody(),
  });

  return (
    <TimerWrap>
      <Timer player={1} />
      <PutButton
        active={active && point[0] > -1}
        onClick={putHandler}
        disabled={!active || point[0] < 0}
      >
        put
      </PutButton>
      <Timer player={2} />
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
