import { useRouter } from 'next/router';
import { ImExit } from 'react-icons/im';

export default function ExitButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.push('/')}>
      <ImExit />
    </button>
  );
}
