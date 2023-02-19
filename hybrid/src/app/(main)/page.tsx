import MakeRoom from '@/components/main/MakeRoom';
import Rooms from '@/components/main/Rooms';
import SearchBar from '@/components/main/SearchBar';
import styles from '@/styles/main/Main.module.scss';

export default function Home() {
  return (
    <main className={styles.pageWrap}>
      <div className={styles.topComponent}>
        <SearchBar />
        <MakeRoom />
      </div>
      <Rooms />
    </main>
  );
}
