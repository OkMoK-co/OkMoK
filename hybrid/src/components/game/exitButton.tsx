import { ImExit } from 'react-icons/im';
import { socketVar } from '@/socket/variable';
import { useRequest } from '@/hooks/useRequest';

export default function ExitButton() {
  const exitRoomHandler = useRequest({ id: socketVar.ROOM_EXIT_REQUEST });

  return (
    <button onClick={exitRoomHandler}>
      <ImExit />
    </button>
  );
}
