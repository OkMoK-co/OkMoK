import { routeResponseProps, room, putInfo } from '@/utils/type/socketType';

export function loginHandler({
  packet: { data, id, option },
  setResponse,
}: routeResponseProps) {
  if (!option) {
    alert('Failed to login');
    return;
  }

  const userId = data.getBigUint64(5, true);
  const nickname = 'guest' + userId.toString();

  setResponse(() => ({
    packetId: id,
    data: { id: userId, nickname },
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

export function enterRoomHandler({
  packet: { option, router },
  setResponse,
}: routeResponseProps) {
  if (!option) {
    alert('Failed to Enter room');
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

export function kickoutUserHandler({
  packet: { option },
  setResponse,
}: routeResponseProps) {
  if (!option) {
    alert('Failed to kick out');
    return;
  }

  alert('Success to kick out');
}

export function kickedoutUserHandler({
  packet: { router },
  setResponse,
}: routeResponseProps) {
  alert('You are kicked out');

  router.push('/');
}

export function readyHandler({
  packet: { id, option },
  setResponse,
}: routeResponseProps) {
  if (!option) {
    alert('Failed to ready');
    return;
  }

  setResponse((prev) => ({ ...prev, packetId: id }));
}

/** game 관련 */
export function startGameHandler({
  packet: { data, id },
  setResponse,
}: routeResponseProps) {
  const startTime = data.getBigUint64(5, true);

  setResponse(() => ({
    packetId: id,
    data: { startTime, ready: true, winner: 0 },
  }));
}

export function putHandler({
  packet: { option },
  setResponse,
}: routeResponseProps) {
  if (!option) {
    alert('Failed to put');
    return;
  }
}

export function recievePutHandler({
  packet: { data, id, option },
  setResponse,
}: routeResponseProps) {
  if (!option) {
    alert('Failed to recieve put');
    return;
  }
  const putInfo: putInfo = {
    x: data.getInt8(5),
    y: data.getInt8(6),
    player: data.getInt8(7),
    time: data.getBigUint64(8, true),
  };
  setResponse(() => ({
    packetId: id,
    data: putInfo,
  }));
}

export function giveupHandler({
  packet: { option },
  setResponse,
}: routeResponseProps) {
  if (!option) {
    alert('Failed to give up');
    return;
  }
}

export function resultGameHandler({
  packet: { data, id },
  setResponse,
}: routeResponseProps) {
  const winner = data.getInt8(5);
  setResponse(() => ({
    packetId: id,
    data: { startTime: BigInt(0), ready: false, winner },
  }));
}
