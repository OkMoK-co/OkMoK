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
    <TimeWrap active={active} player={player}>
      <TimeDiv active={active}>{active ? timer / SEC : limitTime}</TimeDiv>
    </TimeWrap>
  );
}

const TimeWrap = styled.div<{ active: boolean; player: number }>`
  ${({ theme }) => theme.flexs.center};
  width: 10rem;
  border-radius: ${({ player }) =>
    player === 1 ? '2rem 0 0 2rem' : '0 2rem 2rem 0'};
  border: solid
    ${({ active, theme }) =>
      active ? theme.colors.white : theme.colors.darkgray};
  filter: ${({ active }) =>
    active ? 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.9))' : 'none'};
`;

const TimeDiv = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  color: ${({ theme, active }) =>
    active ? theme.colors.white : theme.colors.darkgray};
`;
