import { useRecoilValue } from 'recoil';
import { gameInfoState, roomInfoState } from '@/utils/recoil/socket';
import { socketVar } from '@/socket/variable';
import { useRequest } from '@/hooks/useRequest';
import styled from 'styled-components';

export default function KickoutButton() {
  const sendKickoutHandler = useRequest({ id: socketVar.ROOM_KICKOUT_REQUEST });
  const { startTime } = useRecoilValue(gameInfoState);
  const { player2 } = useRecoilValue(roomInfoState);
  const isActive = !startTime && player2;

  const kickoutHandler = () => {
    if (isActive) sendKickoutHandler();
  };

  return (
    <Button active={isActive} onClick={kickoutHandler}>
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
