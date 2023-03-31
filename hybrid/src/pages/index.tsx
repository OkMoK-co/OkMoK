import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { socketState } from '@/utils/recoil/socket';
import { requestHandler } from '@/socket/requestHandler';
import { socketVar } from '@/socket/variable';
import Rooms from '@/components/main/Rooms';
import SearchBar from '@/components/main/SearchBar';
import PlayButton from '@/components/main/PlayButton';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const socket = useRecoilValue(socketState);

  useEffect(() => {
    if (socket) {
      socket?.send(requestHandler({ id: socketVar.ROOM_MAIN_REQUEST }));
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
