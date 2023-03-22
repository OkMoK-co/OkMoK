import RoomItem from './RoomItem';

const dummy = Array.from({ length: 10 }, (_, i) => {
  return {
    number: i + 1,
    limit: 30,
    players: { player1: 'jabae', player2: 'daekim' },
  };
});

export default function Rooms() {
  return (
    <div>
      {dummy.map(({ number, limit, players }) => (
        <RoomItem
          key={number}
          number={number}
          limit={limit}
          players={players}
        />
      ))}
    </div>
  );
}
