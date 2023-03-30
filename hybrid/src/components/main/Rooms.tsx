import { responseState } from '@/utils/recoil/socket';
import { responseType } from '@/utils/type/socketType';
import { useRecoilValue } from 'recoil';
import RoomItem from './RoomItem';

export default function Rooms() {
  const { rooms } = useRecoilValue<responseType>(responseState);

  return (
    <div>
      {rooms &&
        rooms?.rooms.map(({ roomNumber, limitTime, player1, player2 }) => (
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
