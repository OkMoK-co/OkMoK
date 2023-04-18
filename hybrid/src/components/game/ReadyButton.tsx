import styled from 'styled-components';
import { useRequest } from '@/hooks/useRequest';
import { socketVar } from '@/socket/variable';
import { gameInfoState } from '@/utils/recoil/socket';
import { useRecoilValue } from 'recoil';

export function ReadyButton() {
  const { ready } = useRecoilValue(gameInfoState);
  const readyHandler = useRequest({ id: socketVar.ROOM_READY_REQUEST });

  return (
    <ButtonWrap>
      <Button onClick={readyHandler}>{ready ? 'Wait...' : 'Ready'}</Button>
    </ButtonWrap>
  );
}

const ButtonWrap = styled.div`
  ${({ theme }) => theme.flexs.center};
  z-index: 5;
  width: 375px;
  height: 375px;
  margin-bottom: -375px;
  align-items: center;
`;

const Button = styled.button`
  background-color: rgba(0, 255, 0, 0.7);
  color: ${({ theme }) => theme.colors.white};
  border: solid ${({ theme }) => theme.colors.green};
  border-radius: ${({ theme }) => theme.radiuses.big};
  width: 15rem;
  height: 10rem;
  text-align: center;
  font-size: ${({ theme }) => theme.fontsizes.xlarge};
`;
