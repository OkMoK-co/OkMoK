import Head from 'next/head';
import { Inter } from 'next/font/google';
import SearchBar from '@/components/main/SearchBar';
import PlayButton from '@/components/main/PlayButton';
import Rooms from '@/components/main/Rooms';

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
