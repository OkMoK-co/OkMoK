import { socketVar } from './variable';
import {
  createRoomHandler,
  viewMainRoomsHandler,
  loginHandler,
  recvPutHandler,
} from './responseHandler';
import { routeSocketFunctionProps } from '@/utils/type/socketType';

export const routeSocketFunction: {
  [key: number]: ({ packet, setResponse }: routeSocketFunctionProps) => void;
} = {
  [socketVar.ROOM_CREATE_RESPONSE]: createRoomHandler,
  [socketVar.ROOM_MAIN_RESPONSE]: viewMainRoomsHandler,
  [socketVar.LOGIN_RESPONSE]: loginHandler,
  [socketVar.GAME_PUT_RESPONSE]: recvPutHandler,
};
