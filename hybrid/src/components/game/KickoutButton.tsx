import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { gameInfoState, roomInfoState } from '@/utils/recoil/socket';
import { socketVar } from '@/socket/variable';
import { useRequest } from '@/hooks/useRequest';
import styled from 'styled-components';

export default function KickoutButton() {
  const { startTime } = useRecoilValue(gameInfoState);
  const { player2 } = useRecoilValue(roomInfoState);
  const [isActivate, setActivate] = useState(false);
  const sendKickoutHandler = useRequest({ id: socketVar.ROOM_KICKOUT_REQUEST });

  useEffect(() => {
    if (!startTime && player2) setActivate(true);
    else setActivate(false);
  }, [startTime, player2]);

  const kickoutHandler = () => {
    if (isActivate) sendKickoutHandler();
  };

  return (
    <Button active={isActivate} onClick={kickoutHandler}>
      kick out
    </Button>
  );
}

const Button = styled.button<{ active: boolean }>`
  color: ${(props) => (props.active ? '#ffff00' : '#808080')};
  background-color: black;
  border: solid ${(props) => (props.active ? '#ffff00' : '#808080')};
  border-radius: 1rem;
  width: 5rem;
  height: 1.5rem;
  &:hover {
    cursor: pointer;
  }
`;
