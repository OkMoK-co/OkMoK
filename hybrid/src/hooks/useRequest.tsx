import { useRecoilValue } from 'recoil';
import { socketState } from '@/utils/recoil/socket';
import { requestType } from '@/utils/type/socketType';

export function useRequest({ id, body }: requestType): () => void {
  const socket = useRecoilValue(socketState);

  const HEADER_SIZE = 5;
  const SIZE = body?.byteLength || 0;

  const buffer = new ArrayBuffer(HEADER_SIZE + SIZE);
  const data = new DataView(buffer);

  /* <----- packet header -----> */
  data.setInt16(0, HEADER_SIZE + SIZE, true); // size
  data.setInt16(2, id, true); // id
  data.setInt8(4, 0); // option

  if (body) {
    const bodyData = new Uint8Array(buffer);
    bodyData.set(new Uint8Array(body), HEADER_SIZE);
  }

  const sendRequest = () => {
    if (!socket) {
      console.log('socket error!');
      return;
    }

    socket.send(data);
  };

  return sendRequest;
}
