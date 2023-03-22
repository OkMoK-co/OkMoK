import styles from '@/styles/game/Game.module.scss';

export default function Timer() {
  return (
    <div className={styles.timerWrap}>
      <div>30</div>
      <button>put</button>
      <div>30</div>
    </div>
  );
}
