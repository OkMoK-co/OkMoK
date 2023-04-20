import { ReactElement, useState, useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
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
import GameResultModal from '@/components/game/GameResultModal';

const Game: NextPageWithLayout = () => {
  const { nickname } = useRecoilValue(userState);
  const { roomNumber, player1 } = useRecoilValue(roomInfoState);
  const { startTime, winner } = useRecoilValue(gameInfoState);
  const resetGameInfo = useResetRecoilState(gameInfoState);
  useEnterPage({ id: socketVar.ROOM_INFO_REQUEST });
  const [modalState, setModalState] = useState<number>(0);
  useEffect(() => {
    if (!winner) return;
    setModalState(winner);
    resetGameInfo();
    setTimeout(() => {
      setModalState(0);
    }, 5000);
  }, [winner]);
  const onClickModal = () => {
    setModalState(0);
    resetGameInfo();
  };

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
      {modalState !== 0 && (
        <GameResultModal result={modalState} onClickModal={onClickModal} />
      )}
      {!startTime && modalState === 0 && <ReadyButton />}
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
  padding: 0 0.5rem;
`;
