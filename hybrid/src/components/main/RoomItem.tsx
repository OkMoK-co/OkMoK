import { ImHome3, ImEnter } from 'react-icons/im';

interface RoomItemProps {
  number: number;
  limit: number;
  players: { player1: string; player2: string };
}

export default function RoomItem({ number, limit, players }: RoomItemProps) {
  return (
    <div>
      <div>
        <ImHome3 />
        {number}
      </div>
      <div>{limit}s</div>
      <div>{players.player1}</div>
      <div>
        <ImEnter />
      </div>
    </div>
  );
}
