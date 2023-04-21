import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { responseState, socketState } from '@/utils/recoil/socket';
import { socketVar } from '@/socket/variable';
import { routeResponse } from '@/socket/routeResponse';
import { useRequest } from '@/hooks/useRequest';

interface SocketConnectProps {
  children: React.ReactNode;
}

export default function SocketConnect({ children }: SocketConnectProps) {
  const loginHandler = useRequest({ id: socketVar.LOGIN_REQUEST });
  const [socket, setSocket] = useRecoilState(socketState);
  const [response, setResponse] = useRecoilState(responseState);
  const router = useRouter();

  useEffect(() => {
    if (socket) {
      socket.binaryType = 'arraybuffer';
      socket.onopen = () => {
        console.log('WebSocket connection opened!');
        loginHandler();
      };
      socket.onmessage = (event) => {
        console.log('Received message:', event.data);
        const data = new DataView(event.data);
        const size = data.getUint16(0, true);
        const id = data.getUint16(2, true);
        const option = data.getUint8(4);
        routeResponse[id]({
          packet: { data, id, option, router },
          setResponse,
        });
      };
      socket.onclose = () => {
        console.log('WebSocket connection closed!');
        setSocket(null);
      };
    } else {
      /** todo: 연결이 끊기면 모달로 안내창 띄워준 후 로그인페이지로 이동 필요*/
      router.push('/login');
    }

    return () => {
      socket?.close();
    };
  }, [socket]);

  return <>{children}</>;
}
