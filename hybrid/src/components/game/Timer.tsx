import styled from 'styled-components';
import useTimer from '@/hooks/useTimer';
import { SEC } from '@/utils/constants';
import { useRecoilValue } from 'recoil';
import { roomInfoState } from '@/utils/recoil/socket';
import useTurn from '@/hooks/useTurn';

interface TimerProps {
  player: number;
}

export default function Timer({ player }: TimerProps) {
  const { limitTime } = useRecoilValue(roomInfoState);
  const { isMyTurn: active } = useTurn(player);
  const { timer } = useTimer({ active });

  return (
    <div>
      <TimeSpan active={active}>{active ? timer / SEC : limitTime}</TimeSpan>
    </div>
  );
}

const TimeSpan = styled.span<{ active: boolean }>`
  color: ${(props) => (props.active ? 'white' : '#808080')};
`;
