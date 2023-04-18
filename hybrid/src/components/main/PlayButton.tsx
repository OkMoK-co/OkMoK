import { socketVar } from '@/socket/variable';
import { useRequest } from '@/hooks/useRequest';
import PlayPutButton from '@/components/buttons/PlayPutButton';

export default function PlayButton() {
  const createRoomHandler = useRequest({ id: socketVar.ROOM_CREATE_REQUEST });

  return (
    <PlayPutButton
      active={true}
      value={'🚀 PLAY'}
      clickHandler={createRoomHandler}
    />
  );
}
