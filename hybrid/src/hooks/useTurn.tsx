import { useRecoilValue } from 'recoil';
import {
  gameInfoState,
  putInfoState,
  userState,
  roomInfoState,
} from '@/utils/recoil/socket';

export default function useTurn(player?: number) {
  const { startTime } = useRecoilValue(gameInfoState);
  const { nickname } = useRecoilValue(userState);
  const { player1 } = useRecoilValue(roomInfoState);
  const putInfo = useRecoilValue(putInfoState);
  if (!player) player = player1 === nickname ? 1 : 2;
  const getMyTurn = () => {
    if (startTime) {
      if (!putInfo.player && player === 1) return true;
      else if (putInfo.player && player !== putInfo.player) return true;
      else return false;
    } else return false;
  };
  const isMyTurn = getMyTurn();

  return { isMyTurn };
}
