import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { roomInfoState } from '@/utils/recoil/socket';

export default function Players() {
  const { player1, player2 } = useRecoilValue(roomInfoState);

  return (
    <Container>
      <Player1Wrap>
        <OkMoK player={1} />
        {player1}
      </Player1Wrap>
      <div> vs </div>
      <Player2Wrap>
        {player2 || '...'}
        <OkMoK player={2} />
      </Player2Wrap>
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => theme.flexs.spaceBetween};
  width: 22rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  margin: 0.5rem;
`;

const Player1Wrap = styled.div`
  display: flex;
  width: 10rem;
`;

const Player2Wrap = styled(Player1Wrap)`
  justify-content: right;
`;
const OkMoK = styled.div<{ player: number }>`
  background-color: ${({ player, theme }) =>
    player === 1 ? theme.colors.green : theme.colors.fucia};
  border-radius: 100%;
  width: 1.2rem;
  height: 1.2rem;
  margin: 0 0.5rem;
`;
