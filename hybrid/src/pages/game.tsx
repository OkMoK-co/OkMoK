import GiveupButton from '@/components/game/GiveupButton';
import Timer from '@/components/game/Timer';
import Players from '@/components/game/Players';
import styles from '@/styles/game/Game.module.scss';
import OmokBoard from '@/components/game/OmokBoard';

export default function Game() {
  return (
    <main className={styles.pageWrap}>
      <div className={styles.gameInfo}>
        <div>Room: [125]</div>
        <GiveupButton />
      </div>
      <OmokBoard />
      <Timer />
      <Players />
    </main>
  );
}
