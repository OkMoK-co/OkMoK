import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { socketState } from '@/utils/recoil/socket';
import { requestHandler } from '@/socket/requestHandler';

interface useEnterPageProps {
  id: number;
}

export default function useEnterPage({ id }: useEnterPageProps) {
  const socket = useRecoilValue(socketState);

  useEffect(() => {
    if (socket) socket?.send(requestHandler({ id }));
  }, [socket]);
}
