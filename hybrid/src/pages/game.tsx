import { ReactElement } from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import styled from 'styled-components';
import GameLayout from '@/components/layout/GameLayout';
import GiveupButton from '@/components/game/GiveupButton';
import Players from '@/components/game/Players';
import OmokBoard from '@/components/game/OmokBoard';
import KickoutButton from '@/components/game/KickoutButton';
import { useRecoilValue } from 'recoil';
import { userState } from '@/utils/recoil/socket';

const Game: NextPageWithLayout = () => {
  const user = useRecoilValue(userState);
  return (
    <main>
      <GameTopWrap>
        <div>Room: [125]</div>
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
