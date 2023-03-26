export interface packetType {
  size: number;
  option: number;
  data: DataView;
  router: any;
}

export interface requestType {
  id: number;
  body?: ArrayBuffer;
}
