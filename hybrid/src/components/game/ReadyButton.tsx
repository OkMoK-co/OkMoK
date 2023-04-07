import { useRequest } from '@/hooks/useRequest';
import { socketVar } from '@/socket/variable';
import { gameInfoState } from '@/utils/recoil/socket';
import { useRecoilValue } from 'recoil';

export function ReadyButton() {
  const { ready } = useRecoilValue(gameInfoState);
  const readyHandler = useRequest({ id: socketVar.ROOM_READY_REQUEST });

  return <button onClick={readyHandler}>{ready ? 'Wait...' : 'Ready'}</button>;
}
