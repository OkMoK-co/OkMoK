import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import GameLayout from '@/components/layout/GameLayout';
import GiveupButton from '@/components/game/GiveupButton';
import Timer from '@/components/game/Timer';
import Players from '@/components/game/Players';
import OmokBoard from '@/components/game/OmokBoard';

const Game: NextPageWithLayout = () => {
  return (
    <main>
      <div>
        <div>Room: [125]</div>
        <GiveupButton />
      </div>
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
