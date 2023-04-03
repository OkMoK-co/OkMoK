import { SetterOrUpdater } from 'recoil';

export interface packetType {
  data: DataView;
  id: number;
  option: number;
  router: any;
}

export interface routeResponseProps {
  packet: packetType;
  setResponse: SetterOrUpdater<responseType>;
}

export interface requestType {
  id: number;
  body?: ArrayBuffer;
}

export interface responseType {
  packetId: number;
  data: rooms | roomInfo | user | null;
}

export interface room {
  roomNumber: number;
  limitTime: number;
  isFull: boolean;
  player1: string;
  player2: string;
}

export interface rooms {
  totalCount: number;
  rooms: room[];
}

export interface roomInfo {
  roomNumber: number;
  limitTime: number;
  player1: string;
  player2: string;
}

export interface user {
  id: bigint;
}
