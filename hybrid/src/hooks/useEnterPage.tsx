import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { socketState } from '@/utils/recoil/socket';
import { useRequest } from './useRequest';

interface useEnterPageProps {
  id: number;
}

export default function useEnterPage({ id }: useEnterPageProps) {
  const socket = useRecoilValue(socketState);
  const sendEnterPageHandler = useRequest({ id });

  useEffect(() => {
    if (socket) sendEnterPageHandler();
  }, [socket]);
}
