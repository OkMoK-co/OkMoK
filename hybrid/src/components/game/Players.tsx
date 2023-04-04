import { useRecoilValue } from 'recoil';
import { roomInfoState } from '@/utils/recoil/socket';
import styled from 'styled-components';

export default function Players() {
  const { player1, player2 } = useRecoilValue(roomInfoState);

  return (
    <PlayersWrap>
      <div>{player1}</div>
      <div> vs </div>
      <div>{player2}</div>
    </PlayersWrap>
  );
}

const PlayersWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-align: center;
  color: white;
`;
