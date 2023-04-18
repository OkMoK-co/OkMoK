import { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import type { NextPageWithLayout } from '@/pages/_app';
import styled from 'styled-components';
import { gameInfoState, roomInfoState, userState } from '@/utils/recoil/socket';
import { socketVar } from '@/socket/variable';
import useEnterPage from '@/hooks/useEnterPage';
import GameLayout from '@/components/layout/GameLayout';
import GiveupButton from '@/components/game/GiveupButton';
import Players from '@/components/game/Players';
import OmokBoard from '@/components/game/OmokBoard';
import KickoutButton from '@/components/game/KickoutButton';
import { ReadyButton } from '@/components/game/ReadyButton';
import { ContentContainer } from '@/styles/common-style';

const Game: NextPageWithLayout = () => {
  const { nickname } = useRecoilValue(userState);
  const { roomNumber, player1 } = useRecoilValue(roomInfoState);
  const { startTime } = useRecoilValue(gameInfoState);

  useEnterPage({ id: socketVar.ROOM_INFO_REQUEST });
  return (
    <Container>
      <GameTopWrap>
        <div>Room: [ {roomNumber} ]</div>
        {startTime ? (
          <GiveupButton />
        ) : (
          nickname === player1 && <KickoutButton />
        )}
      </GameTopWrap>
      {!startTime && <ReadyButton />}
      <OmokBoard />
      <Players />
    </Container>
  );
};

Game.getLayout = function getLayout(page: ReactElement) {
  return <GameLayout>{page}</GameLayout>;
};

export default Game;

const Container = styled(ContentContainer)`
  ${({ theme }) => theme.flexs.centerColumn};
`;

const GameTopWrap = styled.div`
  ${({ theme }) => theme.flexs.spaceBetween};
  width: 375px;
`;
