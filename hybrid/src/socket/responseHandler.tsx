import { packetType, responseType, room } from '@/utils/type/socketType';
import { SetterOrUpdater } from 'recoil';

export function createRoomHandler(
  packet: packetType,
  setResponse: SetterOrUpdater<responseType>
) {
  if (!packet.option) {
    alert('Failed to create room');
    return;
  }

  packet.router.push('/game');
}

export function viewMainRoomsHandler(
  packet: packetType,
  setResponse: SetterOrUpdater<responseType>
) {
  const { data, option } = packet;

  if (!option) {
    alert('Failed to get mainRooms');
    return;
  }

  const decoder = new TextDecoder();
  let totalCount = data.getInt8(5);
  let body: room[] = [];
  for (let i = 0; i < totalCount; i++) {
    let tmp: room = {
      roomNumber: data.getInt32(6 + i * 22, true),
      limitTime: data.getInt16(10 + i * 22, true),
      isFull: !!data.getInt8(12 + i * 22),
      player1:
        'guest' +
        data.getInt32(13 + i * 22, true).toString() +
        data.getInt32(17 + i * 22, true).toString(),
      player2: '',
    };
    body.push(tmp);
  }
  setResponse((prev) => ({
    ...prev,
    rooms: { totalCount, rooms: body },
  }));
}
