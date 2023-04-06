import { requestHandler } from '@/socket/requestHandler';
import { socketVar } from '@/socket/variable';
import { gameInfoState, socketState } from '@/utils/recoil/socket';
import { useRecoilValue } from 'recoil';

export function ReadyButton() {
  const socket = useRecoilValue(socketState);
  const { ready } = useRecoilValue(gameInfoState);

  const readyHandler = () => {
    socket?.send(requestHandler({ id: socketVar.ROOM_READY_REQUEST }));
  };

  return <button onClick={readyHandler}>{ready ? 'Wait...' : 'Ready'}</button>;
}
