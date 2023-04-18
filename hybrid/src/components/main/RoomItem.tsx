import { ImHome3, ImEnter } from 'react-icons/im';
import { socketVar } from '@/socket/variable';
import { useRequest } from '@/hooks/useRequest';
import styled from 'styled-components';

interface RoomItemProps {
  roomNumber: number;
  limitTime: number;
  players: { player1: string; player2: string };
}

export default function RoomItem({
  roomNumber,
  limitTime,
  players,
}: RoomItemProps) {
  const enterRoomHandler = useRequest({
    id: socketVar.ROOM_ENTER_REQUEST,
    body: makeEnterRoomBody(roomNumber),
  });

  return (
    <RoomItemGrid onClick={enterRoomHandler}>
      <div>
        <ImHome3 /> {roomNumber}
      </div>
      <div>{limitTime}s</div>
      <div>{players.player1}</div>
      <div>
        <SmallButton>
          <ImEnter />
        </SmallButton>
      </div>
    </RoomItemGrid>
  );
}

export const makeEnterRoomBody = (roomNumber: number) => {
  const body = new ArrayBuffer(4);
  const data = new DataView(body);
  data.setInt32(0, roomNumber, true);
  return body;
};

const RoomItemGrid = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr 1fr 2fr 1fr;
  padding: 1.5rem;
  margin: calc(${({ theme }) => theme.thick.thin} * -1);
  border: ${({ theme }) =>
    `${theme.thick.thin} solid ${theme.colors.darkgray}`};
  letter-spacing: 1px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.darkgray};
    cursor: pointer;
  }
  @media (${({ theme: { device } }) => device.mobile}) {
    padding: 1rem;
  }
`;

const SmallButton = styled.button`
  ${({ theme }) => theme.flexs.center};
  width: 3.5rem;
  height: 1.8rem;
  border-radius: ${({ theme }) => theme.radiuses.big};
  border: ${({ theme }) => `${theme.thick.thin} solid ${theme.colors.green}`};
  color: ${({ theme }) => theme.colors.green};
  &:hover {
    color: ${({ theme }) => theme.colors.darkgray};
    background-color: ${({ theme }) => theme.colors.green};
  }
  @media (${({ theme: { device } }) => device.mobile}) {
    width: 3rem;
    height: 1.5rem;
  }
`;
