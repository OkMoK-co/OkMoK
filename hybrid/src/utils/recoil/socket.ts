import { atom } from 'recoil';
import { responseType, roomDetail } from '../type/socketType';

export const socketState = atom<WebSocket | null>({
  key: 'socketState',
  default: null,
});

export const responseState = atom<responseType>({
  key: 'responseState',
  default: { packetId: -1, data: null },
});
