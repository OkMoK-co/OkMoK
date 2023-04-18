import { useRecoilValue } from 'recoil';
import { ImExit } from 'react-icons/im';
import { socketVar } from '@/socket/variable';
import { gameInfoState } from '@/utils/recoil/socket';
import { useRequest } from '@/hooks/useRequest';
import ExitEnterButton from '@/components/buttons/ExitEnterButton';

export default function ExitButton() {
  const exitRoomHandler = useRequest({ id: socketVar.ROOM_EXIT_REQUEST });
  const sendGiveUpHandler = useRequest({ id: socketVar.GAME_GIVEUP_REQUEST });
  const { startTime: isStart } = useRecoilValue(gameInfoState);
  const guide =
    'If you leave now, it will count as if you abandoned the game.\n Still want to get out?';

  const processExit = () => {
    if (isStart) {
      if (window.confirm(guide)) sendGiveUpHandler();
      else return;
    }
    exitRoomHandler();
  };

  return (
    <ExitEnterButton
      value={<ImExit />}
      color={isStart ? 'red' : 'green'}
      clickHandler={processExit}
    />
  );
}
