import Rooms from '@/components/main/Rooms';
import SearchBar from '@/components/main/SearchBar';
import PlayButton from '@/components/main/PlayButton';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import { socketState } from '@/utils/recoil/socket';
import { useRecoilValue } from 'recoil';
import { requestHandler } from '@/socket/requestHandler';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const socket = useRecoilValue<WebSocket | null>(socketState);

  useEffect(() => {
    if (socket) {
      const id = Number(`${process.env.NEXT_PUBLIC_ROOM_MAIN_REQUEST}`);
      socket?.send(requestHandler({ id }));
    }
  }, [socket]);

  return (
    <main>
      <SearchBar />
      <PlayButton />
      <Rooms />
    </main>
  );
}
