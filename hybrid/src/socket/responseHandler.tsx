import { packetType } from '@/utils/type/socketType';

export function CreateRoomHandler(packet: packetType) {
  if (!packet.option) {
    alert('Failed to create room');
    return;
  }

  packet.router.push('/game');
}
