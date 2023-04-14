import { useRecoilValue } from 'recoil';
import { ImExit } from 'react-icons/im';
import { socketVar } from '@/socket/variable';
import { gameInfoState } from '@/utils/recoil/socket';
import { useRequest } from '@/hooks/useRequest';

export default function ExitButton() {
  const exitRoomHandler = useRequest({ id: socketVar.ROOM_EXIT_REQUEST });
  const sendGiveUpHandler = useRequest({ id: socketVar.GAME_GIVEUP_REQUEST });
  const { startTime } = useRecoilValue(gameInfoState);
  const guide =
    'If you leave now, it will count as if you abandoned the game.\n Still want to get out?';

  const processExit = () => {
    if (startTime) {
      if (window.confirm(guide)) sendGiveUpHandler();
      else return;
    }
    exitRoomHandler();
  };

  return (
    <button onClick={processExit}>
      <ImExit />
    </button>
  );
}
