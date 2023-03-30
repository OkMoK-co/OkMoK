import { createRoomHandler, viewMainRoomsHandler } from './responseHandler';
import { packetType, responseType } from '@/utils/type/socketType';
import { SetterOrUpdater } from 'recoil';

export const routeSocketFunction: {
  [key: string]: (
    packet: packetType,
    setResponse: SetterOrUpdater<responseType>
  ) => void;
} = {
  [`${process.env.NEXT_PUBLIC_ROOM_CREATE_RESPONSE}`]: createRoomHandler,
  [`${process.env.NEXT_PUBLIC_ROOM_MAIN_RESPONSE}`]: viewMainRoomsHandler,
};
