import { socketVar } from '@/socket/variable';
import { useRequest } from '@/hooks/useRequest';
import styled from 'styled-components';

export default function PlayButton() {
  const createRoomHandler = useRequest({ id: socketVar.ROOM_CREATE_REQUEST });

  return <Button onClick={createRoomHandler}>🚀 PLAY</Button>;
}

const Button = styled.button`
  ${({ theme }) => theme.flexs.center}
  height: 90%;
  width: 10rem;
  border-radius: ${({ theme }) => theme.radiuses.big};
  border: ${({ theme }) => `${theme.thick.bold} solid ${theme.colors.green}`};
  background-color: ${({ theme }) => theme.colors.green};
  letter-spacing: 2px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.black};
  }
  @media (${({ theme: { device } }) => device.mobile}) {
    width: 7rem;
    border: ${({ theme }) =>
      `${theme.thick.middle} solid ${theme.colors.green}`};
  }
`;
