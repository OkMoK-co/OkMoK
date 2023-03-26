import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { socketState } from '@/utils/recoil/socket';
import { routeSocketFunction } from '@/socket/routeSocketFunction';
import { useRouter } from 'next/router';

interface SocketConnectProps {
  children: React.ReactNode;
}

export default function SocketConnect({ children }: SocketConnectProps) {
  const [socket, setSocket] = useRecoilState<WebSocket | null>(socketState);
  const router = useRouter();

  useEffect(() => {
    if (!socket) {
      const newSocket = new WebSocket('ws://localhost:8080');

      newSocket.binaryType = 'arraybuffer';

      newSocket.addEventListener('open', () => {
        console.log('WebSocket connection opened!');
      });

      newSocket.addEventListener('message', (event) => {
        console.log('Received message:', event.data);
        const data = new DataView(event.data);

        const size = data.getInt16(0, true);
        const id = data.getInt16(2, true);
        const option = data.getInt8(4);

        routeSocketFunction[id]({ size, option, data, router });
      });

      newSocket.addEventListener('close', () => {
        console.log('WebSocket connection closed!');
      });

      setSocket(newSocket);
    }

    return () => {
      socket?.close();
    };
  }, []);

  return <>{children}</>;
}
