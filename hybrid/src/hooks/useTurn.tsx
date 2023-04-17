import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
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
  const resetPutInfo = useResetRecoilState(putInfoState);
  if (!player) player = player1 === nickname ? 1 : 2;
  const getMyTurn = () => {
    if (startTime) {
      if (!putInfo.player && player === 1) return true;
      else if (putInfo.player && player !== putInfo.player) return true;
      else return false;
    } else return false;
  };
  const isMyTurn = getMyTurn();

  useEffect(() => {
    resetPutInfo();
  }, [startTime]);

  return { isMyTurn };
}
