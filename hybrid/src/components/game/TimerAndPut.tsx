import styled from 'styled-components';
import { socketVar } from '@/socket/variable';
import { useRequest } from '@/hooks/useRequest';
import Timer from '@/components/game/Timer';
import { Button } from '../buttons/PlayPutButton';

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
  width: 20rem;
  height: 2.4rem;
  color: ${({ theme }) => theme.colors.white};
`;

const PutButton = styled(Button)<{ active: boolean }>`
  color: ${({ theme }) => theme.colors.black};
  z-index: 2;
  position: absolute;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.green : theme.colors.darkgray};
  border: none;
  width: 5rem;
  height: 2.4rem;
  &:hover {
    cursor: ${({ active }) => (active ? 'pointer' : 'default')};
    background-color: ${({ active, theme }) =>
      active ? theme.colors.green : theme.colors.darkgray};
  }
`;
