import { socketVar } from '@/socket/variable';
import { useRequest } from '@/hooks/useRequest';

export default function PlayButton() {
  const createRoomHandler = useRequest({ id: socketVar.ROOM_CREATE_REQUEST });

  return <button onClick={createRoomHandler}>🚀 PLAY</button>;
}
