import { socketVar } from './variable';
import {
  loginHandler,
  viewMainRoomsHandler,
  createRoomHandler,
  enterRoomHandler,
  infoRoomHandler,
  kickoutUserHandler,
  kickedoutUserHandler,
  exitRoomHandler,
  readyHandler,
  startGameHandler,
  putHandler,
  recievePutHandler,
  giveupHandler,
  resultGameHandler,
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
  [socketVar.ROOM_READY_RESPONSE]: readyHandler,
  [socketVar.ROOM_EXIT_RESPONSE]: exitRoomHandler,
  [socketVar.ROOM_KICKOUT_RESPONSE]: kickoutUserHandler,
  [socketVar.R_ROOM_EXIT_RESPONSE]: kickedoutUserHandler,

  [socketVar.R_GAME_START_RESPONSE]: startGameHandler,
  [socketVar.GAME_PUT_RESPONSE]: putHandler,
  [socketVar.R_GAME_PUT_RESPONSE]: recievePutHandler,
  [socketVar.GAME_GIVEUP_RESPONSE]: giveupHandler,
  [socketVar.R_GAME_RESULT_RESPONSE]: resultGameHandler,
};
