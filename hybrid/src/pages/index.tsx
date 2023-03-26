import Rooms from '@/components/main/Rooms';
import SearchBar from '@/components/main/SearchBar';
import PlayButton from '@/components/main/PlayButton';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main>
      <SearchBar />
      <PlayButton />
      <Rooms />
    </main>
  );
}
