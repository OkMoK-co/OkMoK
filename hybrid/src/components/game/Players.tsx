import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { roomInfoState } from '@/utils/recoil/socket';
import { Player1, Player2 } from './Player';

export default function Players() {
  const { player1, player2 } = useRecoilValue(roomInfoState);

  return (
    <Container>
      <Player1 nickname={player1} />
      <div> vs </div>
      <Player2 nickname={player2} />
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => theme.flexs.spaceBetween};
  width: 20rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  margin: 0.5rem;
`;
