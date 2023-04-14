import { atom, selector } from 'recoil';
import {
  user,
  rooms,
  roomInfo,
  gameInfo,
  putInfo,
} from '@/utils/type/socketType';
import { socketVar } from '@/socket/variable';

export const socketState = atom<WebSocket | null>({
  key: 'socketState',
  default: null,
});

/* todo: 각 컴포넌트에서 사용할 상태 변경을 set에 추가해주세요 */
export const responseState = selector<any>({
  key: 'responseState',
  get: ({ get }) => {
    get;
  },
  set: ({ set, get }, newValue) => {
    switch (newValue.packetId) {
      case socketVar.LOGIN_RESPONSE:
        set(userState, newValue.data);
        break;
      case socketVar.ROOM_MAIN_RESPONSE:
      case socketVar.R_ROOM_LIST_RESPONSE:
        set(roomsState, newValue.data);
        break;
      case socketVar.ROOM_INFO_RESPONSE:
      case socketVar.R_ROOM_INFO_RESPONSE:
        set(roomInfoState, newValue.data);
        break;
      case socketVar.ROOM_READY_RESPONSE:
        set(gameInfoState, (get) => ({ ...get, ready: !get.ready }));
        break;
      case socketVar.ROOM_EXIT_RESPONSE:
        set(gameInfoState, (get) => ({ ...get, ready: false }));
        break;
      case socketVar.R_GAME_START_RESPONSE:
      case socketVar.R_GAME_RESULT_RESPONSE:
        set(gameInfoState, newValue.data);
        break;
      case socketVar.R_GAME_PUT_RESPONSE:
        set(putInfoState, newValue.data);
        break;
    }
  },
});

/* todo: 각 컴포넌트에서 사용할 상태를 추가해주세요 */
export const userState = atom<user>({
  key: 'userState',
  default: { id: BigInt(0), nickname: '' },
});

export const roomsState = atom<rooms>({
  key: 'roomsState',
  default: { totalCount: 0, rooms: [] },
});

export const roomInfoState = atom<roomInfo>({
  key: 'roomInfoState',
  default: { roomNumber: 0, limitTime: 0, player1: '', player2: '' },
});

export const gameInfoState = atom<gameInfo>({
  key: 'gameInfoState',
  default: {
    startTime: BigInt(0),
    ready: false,
    winner: 0,
  },
});

export const putInfoState = atom<putInfo>({
  key: 'putInfoState',
  default: {
    x: -1,
    y: -1,
    player: 0,
    time: BigInt(0),
  },
});
