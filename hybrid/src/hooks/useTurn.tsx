import { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import {
  gameInfoState,
  putInfoState,
  userState,
  roomInfoState,
} from '@/utils/recoil/socket';

export default function useTurn() {
  const { startTime } = useRecoilValue(gameInfoState);
  const { nickname } = useRecoilValue(userState);
  const { player1 } = useRecoilValue(roomInfoState);
  const putInfo = useRecoilValue(putInfoState);
  const resetPutInfo = useResetRecoilState(putInfoState);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [player, setPlayer] = useState(0);

  useEffect(() => {
    if (startTime) {
      if (!putInfo.player && player === 1) setIsMyTurn(true);
      else if (putInfo.player && player !== putInfo.player) setIsMyTurn(true);
      else setIsMyTurn(false);
    } else setIsMyTurn(false);
  }, [putInfo, startTime]);
  useEffect(() => {
    if (player1 === nickname) setPlayer(1);
    else setPlayer(2);
  }, [player1]);
  useEffect(() => {
    resetPutInfo();
  }, [startTime]);

  return { isMyTurn };
}
