import { useRequest } from '@/hooks/useRequest';
import { socketVar } from '@/socket/variable';
import GameButton from '@/components/buttons/GameButton';

export default function GiveupButton() {
  const sendGiveUpHandler = useRequest({ id: socketVar.GAME_GIVEUP_REQUEST });

  return (
    <GameButton
      active={true}
      color={'green'}
      value={'give up'}
      clickHandler={sendGiveUpHandler}
    />
  );
}
