import { requestType } from '../utils/type/socketType';

export function requestHandler({ id, body }: requestType) {
  const HEADER_SIZE = 5;
  const SIZE = body?.byteLength || 0;

  const buffer = new ArrayBuffer(HEADER_SIZE + SIZE);
  const data = new DataView(buffer);

  /* <----- packet header -----> */
  /* packet size */
  data.setInt16(0, HEADER_SIZE + SIZE, true);
  /* packet ID */
  data.setInt16(2, id, true);
  /* packet option */
  data.setInt8(4, 0);

  return data;
}
