import { routeSocketFunctionProps, room } from '@/utils/type/socketType';

export function createRoomHandler({
  packet: { option, router },
  setResponse,
}: routeSocketFunctionProps) {
  if (!option) {
    alert('Failed to create room');
    return;
  }

  /* todo: 추후 확인 후 라우팅 이동 수정 필요 */
  router.push('/game');
}

export function viewMainRoomsHandler({
  packet: { data, id, option },
  setResponse,
}: routeSocketFunctionProps) {
  if (!option) {
    alert('Failed to get mainRooms');
    return;
  }

  let totalCount = data.getInt8(5);
  let body: room[] = [];

  for (let i = 0; i < totalCount; i++) {
    let tmp: room = {
      roomNumber: data.getInt32(6 + i * 22, true),
      limitTime: data.getInt8(10 + i * 22),
      isFull: !!data.getInt8(11 + i * 22),
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

export function loginHandler({
  packet: { data, id, option },
  setResponse,
}: routeSocketFunctionProps) {
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

export function receivePutHandler({
  packet: { data, id, option },
  setResponse,
}: routeSocketFunctionProps) {
  if (!option) {
    alert('Failed to put');
    return;
  }
}
