import { ImExit } from 'react-icons/im';
import { useRecoilValue } from 'recoil';
import { socketState } from '@/utils/recoil/socket';
import { requestHandler } from '@/socket/requestHandler';
import { socketVar } from '@/socket/variable';

export default function ExitButton() {
  const socket = useRecoilValue(socketState);

  const exitRoomHandler = () => {
    socket?.send(requestHandler({ id: socketVar.ROOM_EXIT_REQUEST }));
  };

  return (
    <button onClick={exitRoomHandler}>
      <ImExit />
    </button>
  );
}
