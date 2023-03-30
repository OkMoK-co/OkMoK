import { SetterOrUpdater } from 'recoil';

export interface packetType {
  data: DataView;
  option: number;
  router: any;
}

export interface requestType {
  id: number;
  body?: ArrayBuffer;
}

/** response type */
export interface responseType {
  packet: packetType;
  setResponse: SetterOrUpdater<responseType>;
}

export interface rooms {
  totalCount: number;
  rooms: room[];
}
export interface room {
  roomNumber: number;
  limitTime: number;
  isFull: boolean;
  player1: string;
  player2: string;
}

export interface roomDetail {
  roomNumber: number;
  limitTime: number;
  player1: string;
  player2: string;
}

export interface responseType {
  packetId: number;
  rooms?: rooms | null;
  roomDetail?: roomDetail | null;
}
