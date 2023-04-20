import styled from 'styled-components';

interface PlayerProps {
  nickname: string;
}

export function Player1({ nickname }: PlayerProps) {
  return (
    <Player1Wrap>
      <OkMoK />
      {nickname}
    </Player1Wrap>
  );
}

export function Player2({ nickname }: PlayerProps) {
  return (
    <Player2Wrap>
      {nickname || '...'}
      <OkMoK />
    </Player2Wrap>
  );
}

const Player1Wrap = styled.div`
  display: flex;
  width: 10rem;
  div {
    background-color: ${({ theme }) => theme.colors.green};
  }
`;

const Player2Wrap = styled(Player1Wrap)`
  justify-content: right;
  div {
    background-color: ${({ theme }) => theme.colors.fucia};
  }
`;

const OkMoK = styled.div`
  border-radius: 100%;
  width: 1.2rem;
  height: 1.2rem;
  margin: 0 0.5rem;
`;
