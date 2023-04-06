import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  gameInfoState,
  roomInfoState,
  socketState,
} from '@/utils/recoil/socket';
import styled from 'styled-components';
import { requestHandler } from '@/socket/requestHandler';
import { socketVar } from '@/socket/variable';

export default function KickoutButton() {
  const socket = useRecoilValue(socketState);
  const gamestartTime = useRecoilValue(gameInfoState).startTime;
  const rival = useRecoilValue(roomInfoState).player2;
  const [isActivate, setActivate] = useState(false);

  useEffect(() => {
    if (!gamestartTime && rival) setActivate(true);
    else setActivate(false);
  }, [gamestartTime, rival]);

  const kickoutHandler = () => {
    if (isActivate)
      socket?.send(requestHandler({ id: socketVar.ROOM_KICKOUT_REQUEST }));
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
