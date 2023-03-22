import GiveupButton from '@/components/game/GiveupButton';
import Timer from '@/components/game/Timer';
import Players from '@/components/game/Players';
import OmokBoard from '@/components/game/OmokBoard';

export default function Game() {
  return (
    <main>
      <div>
        <div>Room: [125]</div>
        <GiveupButton />
      </div>
      <OmokBoard />
      <Timer />
      <Players />
    </main>
  );
}
