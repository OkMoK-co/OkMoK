import { CreateRoomHandler } from './responseHandler';
import { packetType } from '@/utils/type/socketType';

export const routeSocketFunction: {
  [key: string]: (packet: packetType) => void;
} = {
  [`${process.env.NEXT_PUBLIC_ROOM_CREATE_RESPONSE}`]: CreateRoomHandler,
};
