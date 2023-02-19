import styles from '../../styles/main/Rooms.module.scss';

interface propsType {
  number: number;
  limit: number;
  player1: string;
  player2: string;
}

export default function RoomItem({
  number,
  limit,
  player1,
  player2,
}: propsType) {
  return (
    <div className={styles.rooms}>
      <div>⌂ {number}</div>
      <div>{limit}s</div>
      <div>
        <div>{player1}</div>
        <div>{player2}</div>
      </div>
      {player1 && player2 && <div>⎆</div>}
    </div>
  );
}
