import { Inter } from 'next/font/google';
import { socketVar } from '@/socket/variable';
import useEnterPage from '@/hooks/useEnterPage';
import Rooms from '@/components/main/Rooms';
import SearchBar from '@/components/main/SearchBar';
import PlayButton from '@/components/main/PlayButton';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  useEnterPage({ id: socketVar.ROOM_MAIN_REQUEST });

  return (
    <main>
      <SearchBar />
      <PlayButton />
      <Rooms />
    </main>
  );
}
