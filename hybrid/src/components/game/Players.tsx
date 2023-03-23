import styled from 'styled-components';

export default function Players() {
  return (
    <PlayersWrap>
      <div>name</div>
      <div> vs </div>
      <div>name</div>
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
