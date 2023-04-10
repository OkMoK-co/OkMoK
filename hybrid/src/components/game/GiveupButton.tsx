import styled from 'styled-components';
import { useRequest } from '@/hooks/useRequest';
import { socketVar } from '@/socket/variable';

export default function GiveupButton() {
  const sendGiveUpHandler = useRequest({ id: socketVar.GAME_GIVEUP_REQUEST });
  return <Button onClick={sendGiveUpHandler}>give up</Button>;
}

const Button = styled.button`
  color: #00ff00;
  background-color: black;
  border: solid #00ff00;
  border-radius: 1rem;
  width: 5rem;
  height: 1.5rem;
  &:hover {
    cursor: pointer;
  }
`;
