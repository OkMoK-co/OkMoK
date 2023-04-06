import { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import type { NextPageWithLayout } from '@/pages/_app';
import { roomInfoState, userState } from '@/utils/recoil/socket';
import { socketVar } from '@/socket/variable';
import useEnterPage from '@/hooks/useEnterPage';
import GameLayout from '@/components/layout/GameLayout';
import GiveupButton from '@/components/game/GiveupButton';
import Players from '@/components/game/Players';
import OmokBoard from '@/components/game/OmokBoard';
import KickoutButton from '@/components/game/KickoutButton';
import styled from 'styled-components';

const Game: NextPageWithLayout = () => {
  const nickname = useRecoilValue(userState).nickname;
  const { roomNumber, player1 } = useRecoilValue(roomInfoState);

  useEnterPage({ id: socketVar.ROOM_INFO_REQUEST });

  return (
    <main>
      <GameTopWrap>
        <div>Room: [ {roomNumber} ]</div>
        <GiveupButton />
        {nickname === player1 && <KickoutButton />}
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
