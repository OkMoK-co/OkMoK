import { useRecoilValue } from 'recoil';
import { socketState } from '@/utils/recoil/socket';
import { requestHandler } from '@/socket/requestHandler';

export default function PlayButton() {
  const socket = useRecoilValue<WebSocket | null>(socketState);

  const enterRoomHandler = () => {
    const id = Number(`${process.env.NEXT_PUBLIC_ROOM_CREATE_REQUEST}`);

    socket?.send(requestHandler({ id }));
  };

  return <button onClick={enterRoomHandler}>🚀 PLAY</button>;
}
