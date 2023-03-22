import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import GameLayout from '@/components/layout/GameLayout';

const Game: NextPageWithLayout = () => {
  return <main>game</main>;
};

Game.getLayout = function getLayout(page: ReactElement) {
  return <GameLayout>{page}</GameLayout>;
};

export default Game;
