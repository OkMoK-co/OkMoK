import { routeResponseProps, room } from '@/utils/type/socketType';

export function loginHandler({
  packet: { data, id, option },
  setResponse,
}: routeResponseProps) {
  if (!option) {
    alert('Failed to login');
    return;
  }

  let userId = data.getBigUint64(5, true);
  setResponse(() => ({
    packetId: id,
    data: { id: userId },
  }));
}

/** room 관련 */
export function viewMainRoomsHandler({
  packet: { data, id, option },
  setResponse,
}: routeResponseProps) {
  if (!option) {
    alert('Failed to get mainRooms');
    return;
  }

  let totalCount = data.getUint8(5);
  let body: room[] = [];

  for (let i = 0; i < totalCount; i++) {
    let tmp: room = {
      roomNumber: data.getUint32(6 + i * 22, true),
      limitTime: data.getUint8(10 + i * 22),
      isFull: !!data.getUint8(11 + i * 22),
      player1: 'guest' + data.getBigUint64(12 + i * 22, true).toString(),
      player2: data.getBigUint64(20 + i * 22, true)
        ? 'guest' + data.getBigUint64(12 + i * 22, true).toString()
        : '',
    };
    body.push(tmp);
  }
  setResponse(() => ({
    packetId: id,
    data: { totalCount, rooms: body },
  }));
}

export function createRoomHandler({
  packet: { option, router },
  setResponse,
}: routeResponseProps) {
  if (!option) {
    alert('Failed to create room');
    return;
  }

  router.push('/game');
}

export function infoRoomHandler({
  packet: { data, id, option },
  setResponse,
}: routeResponseProps) {
  if (!option) {
    alert('Failed to get room info');
    return;
  }

  const roomNumber = data.getUint32(5, true);
  const limitTime = data.getUint8(9);
  const player1 = 'guest' + data.getBigUint64(10, true).toString();
  const player2 = data.getBigUint64(18, true)
    ? 'guest' + data.getBigUint64(18, true).toString()
    : '';

  setResponse(() => ({
    packetId: id,
    data: { roomNumber, limitTime, player1, player2 },
  }));
}

export function exitRoomHandler({
  packet: { option, router },
  setResponse,
}: routeResponseProps) {
  if (!option) {
    alert('Failed to exit room');
    return;
  }

  router.push('/');
}

/** game 관련 */
export function receivePutHandler({
  packet: { data, id, option },
  setResponse,
}: routeResponseProps) {
  if (!option) {
    alert('Failed to put');
    return;
  }
}
