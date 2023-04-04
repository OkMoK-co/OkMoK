import { useRecoilValue } from 'recoil';
import { socketState } from '@/utils/recoil/socket';
import { requestHandler } from '@/socket/requestHandler';
import { socketVar } from '@/socket/variable';

export default function PlayButton() {
  const socket = useRecoilValue(socketState);

  const createRoomHandler = () => {
    socket?.send(requestHandler({ id: socketVar.ROOM_CREATE_REQUEST }));
  };

  return <button onClick={createRoomHandler}>🚀 PLAY</button>;
}
