import { ReactElement, useState } from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import styled from 'styled-components';
import GameLayout from '@/components/layout/GameLayout';
import GiveupButton from '@/components/game/GiveupButton';
import Timer from '@/components/game/Timer';
import Players from '@/components/game/Players';
import OmokBoard from '@/components/game/OmokBoard';
import KickoutButton from '@/components/game/KickoutButton';

const Game: NextPageWithLayout = () => {
  const [inGame, setInGame] = useState(false); //상태관리를 써야할까?
  return (
    <main>
      <GameTopWrap>
        <div>Room: [125]</div>
        <GiveupButton />
        <KickoutButton />
      </GameTopWrap>
      <OmokBoard />
      <Timer />
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
