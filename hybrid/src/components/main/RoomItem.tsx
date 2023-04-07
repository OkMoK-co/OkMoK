import { useRecoilValue } from 'recoil';
import { ImHome3, ImEnter } from 'react-icons/im';
import { socketState } from '@/utils/recoil/socket';
import { socketVar } from '@/socket/variable';
import { useRequest } from '@/hooks/useRequest';

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
  const enterRoomHandler = useRequest({
    id: socketVar.ROOM_ENTER_REQUEST,
    body: makeEnterRoomBody(roomNumber),
  });

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

export const makeEnterRoomBody = (roomNumber: number) => {
  const body = new ArrayBuffer(4);
  const data = new DataView(body);
  data.setInt32(0, roomNumber, true);
  return body;
};
