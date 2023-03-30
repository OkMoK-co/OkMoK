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
  return (
    <div>
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
