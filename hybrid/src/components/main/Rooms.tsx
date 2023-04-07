import { useRecoilValue } from 'recoil';
import { roomsState } from '@/utils/recoil/socket';
import RoomItem from './RoomItem';

export default function Rooms() {
  const { rooms } = useRecoilValue(roomsState);

  return (
    <div>
      {rooms &&
        rooms.map(({ roomNumber, limitTime, player1, player2 }) => (
          <RoomItem
            key={roomNumber}
            roomNumber={roomNumber}
            limitTime={limitTime}
            players={{ player1, player2 }}
          />
        ))}
    </div>
  );
}
