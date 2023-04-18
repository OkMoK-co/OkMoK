import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { roomInfoState } from '@/utils/recoil/socket';

export default function Players() {
  const { player1, player2 } = useRecoilValue(roomInfoState);

  return (
    <Container>
      <PlayerWrap>
        <OkMoK player={1} />
        {player1}
      </PlayerWrap>
      <div> vs </div>
      <PlayerWrap>
        {player2 || '...'}
        <OkMoK player={2} />
      </PlayerWrap>
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => theme.flexs.center};
  width: 24rem;
  justify-content: space-around;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  margin: 0.5rem;
`;

const PlayerWrap = styled.div`
  ${({ theme }) => theme.flexs.center};
`;
const OkMoK = styled.div<{ player: number }>`
  background-color: ${({ player, theme }) =>
    player === 1 ? theme.colors.green : theme.colors.fucia};
  border-radius: 100%;
  width: 1.2rem;
  height: 1.2rem;
  margin: 0 0.5rem;
`;
