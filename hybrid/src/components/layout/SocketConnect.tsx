import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { responseState, socketState } from '@/utils/recoil/socket';
import { routeSocketFunction } from '@/socket/routeSocketFunction';
import { socketVar } from '@/socket/variable';
import { requestHandler } from '@/socket/requestHandler';

interface SocketConnectProps {
  children: React.ReactNode;
}

export default function SocketConnect({ children }: SocketConnectProps) {
  const [socket, setSocket] = useRecoilState(socketState);
  const [response, setResponse] = useRecoilState(responseState);
  const router = useRouter();

  useEffect(() => {
    if (!socket) {
      const newSocket = new WebSocket('ws://localhost:8080');

      newSocket.binaryType = 'arraybuffer';

      newSocket.addEventListener('open', () => {
        console.log('WebSocket connection opened!');
        setSocket(newSocket);
        const loginData = requestHandler({ id: socketVar.LOGIN_REQUEST });
        newSocket.send(loginData);
      });

      newSocket.addEventListener('message', (event) => {
        console.log('Received message:', event.data);

        const data = new DataView(event.data);

        const size = data.getInt16(0, true);
        const id = data.getInt16(2, true);
        const option = data.getInt8(4);
        routeSocketFunction[id]({
          packet: { data, id, option, router },
          setResponse,
        });
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
