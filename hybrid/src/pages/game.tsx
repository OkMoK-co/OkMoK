import { ReactElement, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import type { NextPageWithLayout } from '@/pages/_app';
import { roomInfoState, socketState, userState } from '@/utils/recoil/socket';
import { requestHandler } from '@/socket/requestHandler';
import { socketVar } from '@/socket/variable';
import GameLayout from '@/components/layout/GameLayout';
import GiveupButton from '@/components/game/GiveupButton';
import Players from '@/components/game/Players';
import OmokBoard from '@/components/game/OmokBoard';
import KickoutButton from '@/components/game/KickoutButton';
import styled from 'styled-components';

const Game: NextPageWithLayout = () => {
  const socket = useRecoilValue(socketState);
  const user = useRecoilValue(userState);
  const { roomNumber } = useRecoilValue(roomInfoState);

  useEffect(() => {
    socket?.send(requestHandler({ id: socketVar.ROOM_INFO_REQUEST }));
  }, []);

  return (
    <main>
      <GameTopWrap>
        <div>Room: [ {roomNumber} ]</div>
        <GiveupButton />
        <KickoutButton />
      </GameTopWrap>
      <OmokBoard />
      <Players />
    </main>
  );
};

Game.getLayout = function getLayout(page: ReactElement) {
  return <GameLayout>{page}</GameLayout>;
};

export default Game;

const GameTopWrap = styled.div`
  display: flex;
`;
