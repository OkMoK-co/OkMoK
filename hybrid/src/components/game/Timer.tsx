import styled from 'styled-components';
import useTimer from '@/hooks/useTimer';
import { SEC } from '@/utils/constants';
import { useRecoilValue } from 'recoil';
import {
  gameInfoState,
  putInfoState,
  roomInfoState,
} from '@/utils/recoil/socket';
import { useEffect, useState } from 'react';

interface TimerProps {
  player: number;
}

export default function Timer({ player }: TimerProps) {
  const { startTime } = useRecoilValue(gameInfoState);
  const putInfo = useRecoilValue(putInfoState);
  const { limitTime } = useRecoilValue(roomInfoState);
  const [active, setActive] = useState(false);
  const { timer } = useTimer({ active: active });

  useEffect(() => {
    if (startTime) {
      if (!putInfo.player && player === 1) setActive(true);
      else if (putInfo.player && putInfo.player !== player) setActive(true);
      else setActive(false);
    } else setActive(false);
  }, [startTime, putInfo]);

  return (
    <div>
      <TimeSpan active={active}>{active ? timer / SEC : limitTime}</TimeSpan>
    </div>
  );
}

const TimeSpan = styled.span<{ active: boolean }>`
  color: ${(props) => (props.active ? 'white' : '#808080')};
`;
