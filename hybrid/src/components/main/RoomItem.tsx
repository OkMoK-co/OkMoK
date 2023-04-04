import { useRecoilValue } from 'recoil';
import { socketState } from '@/utils/recoil/socket';
import { requestHandler } from '@/socket/requestHandler';
import { socketVar } from '@/socket/variable';
import { ImHome3, ImEnter } from 'react-icons/im';

interface RoomItemProps {
  roomNumber: number;
  limitTime: number;
  players: { player1: string; player2: string };
}

export default function RoomItem({
  roomNumber,
  limitTime,
  players,
}: RoomItemProps) {
  const socket = useRecoilValue(socketState);

  const enterRoomHandler = () => {
    const id = socketVar.ROOM_ENTER_REQUEST;
    const body = new ArrayBuffer(4);
    const data = new DataView(body);
    data.setInt32(0, roomNumber, true);
    socket?.send(requestHandler({ id, body }));
  };

  return (
    <div onClick={enterRoomHandler}>
      <div>
        <ImHome3 />
        {roomNumber}
      </div>
      <div>{limitTime}s</div>
      <div>{players.player1}</div>
      <div>
        <ImEnter />
      </div>
    </div>
  );
}
