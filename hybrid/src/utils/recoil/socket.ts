import { atom, selector } from 'recoil';
import { rooms, user } from '@/utils/type/socketType';
import { socketVar } from '@/socket/variable';

export const socketState = atom<WebSocket | null>({
  key: 'socketState',
  default: null,
});

/* todo: 각 컴포넌트에서 사용할 상태 변경을 set에 추가해주세요 */
export const responseState = selector<any>({
  key: 'responseState',
  get: ({ get }) => {},
  set: ({ set }, newValue) => {
    switch (newValue.packetId) {
      case socketVar.LOGIN_RESPONSE:
        set(userState, newValue.data);
        break;
      case socketVar.ROOM_MAIN_RESPONSE:
      case socketVar.R_ROOM_LIST_RESPONSE:
        set(roomsState, newValue.data);
        break;
    }
  },
});

/* todo: 각 컴포넌트에서 사용할 상태를 추가해주세요 */
export const roomsState = atom<rooms>({
  key: 'roomsState',
  default: { totalCount: 0, rooms: [] },
});

export const userState = atom<user>({
  key: 'userState',
  default: { id: BigInt(0) },
});
