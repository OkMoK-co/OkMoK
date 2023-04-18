import { useRecoilValue } from 'recoil';
import { gameInfoState, roomInfoState } from '@/utils/recoil/socket';
import { socketVar } from '@/socket/variable';
import { useRequest } from '@/hooks/useRequest';
import GameButton from '@/components/buttons/GameButton';

export default function KickoutButton() {
  const sendKickoutHandler = useRequest({ id: socketVar.ROOM_KICKOUT_REQUEST });
  const { startTime } = useRecoilValue(gameInfoState);
  const { player2 } = useRecoilValue(roomInfoState);
  const isActive = !startTime && player2;

  const kickoutHandler = () => {
    if (isActive) sendKickoutHandler();
  };

  return (
    <GameButton
      active={isActive}
      color={'yellow'}
      value={'kick out'}
      clickHandler={kickoutHandler}
    />
  );
}
