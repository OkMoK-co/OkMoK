import RoomItem from './RoomItem';

const arr = [
  { number: 40, limit: 30, players: { p1: 'jabae', p2: 'daekim' } },
  { number: 41, limit: 30, players: { p1: 'jiyo', p2: 'donghyuk' } },
  { number: 42, limit: 30, players: { p1: 'jabae', p2: 'donghyuk' } },
  { number: 43, limit: 30, players: { p1: 'jiyo', p2: 'daekim' } },
];

export default function Rooms() {
  return (
    <div>
      {arr.map((e) => (
        <RoomItem
          key={e.number}
          number={e.number}
          limit={e.limit}
          player1={e.players.p1}
          player2={e.players.p2}
        />
      ))}
    </div>
  );
}
