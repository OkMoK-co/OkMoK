import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { responseState, socketState } from '@/utils/recoil/socket';
import { routeSocketFunction } from '@/socket/routeSocketFunction';
import { useRouter } from 'next/router';
import { responseType } from '@/utils/type/socketType';

interface SocketConnectProps {
  children: React.ReactNode;
}

export default function SocketConnect({ children }: SocketConnectProps) {
  const [socket, setSocket] = useRecoilState<WebSocket | null>(socketState);
  const [response, setResponse] = useRecoilState<responseType>(responseState);
  const router = useRouter();

  useEffect(() => {
    if (!socket) {
      const newSocket = new WebSocket('ws://localhost:8080');

      newSocket.binaryType = 'arraybuffer';

      newSocket.addEventListener('open', () => {
        console.log('WebSocket connection opened!');
        setSocket(newSocket);
      });

      newSocket.addEventListener('message', (event) => {
        console.log('Received message:', event.data);
        const data = new DataView(event.data);

        const size = data.getInt16(0, true);
        const id = data.getInt16(2, true);
        const option = data.getInt8(4);
        routeSocketFunction[id]({ data, option, router }, setResponse);
        setResponse((prev) => ({ ...prev, packetId: id }));
      });

      newSocket.addEventListener('close', () => {
        console.log('WebSocket connection closed!');
      });
    }

    return () => {
      socket?.close();
    };
  }, []);

  return <>{children}</>;
}
