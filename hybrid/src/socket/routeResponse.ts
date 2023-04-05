import { socketVar } from './variable';
import {
  loginHandler,
  viewMainRoomsHandler,
  createRoomHandler,
  enterRoomHandler,
  infoRoomHandler,
  exitRoomHandler,
  putHandler,
  recievePutHandler,
} from './responseHandler';
import { routeResponseProps } from '@/utils/type/socketType';

export const routeResponse: {
  [key: number]: ({ packet, setResponse }: routeResponseProps) => void;
} = {
  [socketVar.LOGIN_RESPONSE]: loginHandler,

  [socketVar.ROOM_MAIN_RESPONSE]: viewMainRoomsHandler,
  [socketVar.R_ROOM_LIST_RESPONSE]: viewMainRoomsHandler,
  [socketVar.ROOM_CREATE_RESPONSE]: createRoomHandler,
  [socketVar.ROOM_ENTER_RESPONSE]: enterRoomHandler,
  [socketVar.ROOM_INFO_RESPONSE]: infoRoomHandler,
  [socketVar.R_ROOM_INFO_RESPONSE]: infoRoomHandler,
  [socketVar.ROOM_EXIT_RESPONSE]: exitRoomHandler,

  [socketVar.GAME_PUT_RESPONSE]: putHandler,
  [socketVar.R_GAME_PUT_RESPONSE]: recievePutHandler,
};
