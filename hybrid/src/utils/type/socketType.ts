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
  data: rooms | roomInfo | user | gameInfo | putInfo | null;
}

export interface user {
  id: bigint;
  nickname: string;
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

export interface gameInfo {
  startTime: BigInt;
  winner: number;
}

export interface putInfo {
  result: number;
  x: number;
  y: number;
  player: number;
  time: BigInt;
}
