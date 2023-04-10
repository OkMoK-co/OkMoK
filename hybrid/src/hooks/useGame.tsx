import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  gameInfoState,
  putInfoState,
  userState,
  roomInfoState,
} from '@/utils/recoil/socket';

export default function useGame() {
  const { startTime } = useRecoilValue(gameInfoState);
  const [putInfo, setPutInfo] = useRecoilState(putInfoState);
  const user = useRecoilValue(userState);
  const { player1 } = useRecoilValue(roomInfoState);
  const winner = useRecoilValue(gameInfoState);
  const [active, setActive] = useState(false);
  const [player, setPlayer] = useState(0);

  useEffect(() => {
    if (startTime) {
      if (!putInfo.player && player === 1) setActive(true);
      else if (putInfo.player && player !== putInfo.player) setActive(true);
      else setActive(false);
    } else setActive(false);
  }, [putInfo, startTime]);
  useEffect(() => {
    if (player1 === user.nickname) setPlayer(1);
    else setPlayer(2);
  }, [player1]);
  useEffect(() => {
    setPutInfo({ x: -1, y: -1, player: 0, time: BigInt(0) });
  }, [winner]);

  const isMyTurn = () => active;

  return { isMyTurn };
}
