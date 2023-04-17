import { useEffect, useCallback, useRef, useState } from 'react';
import { SEC } from '@/utils/constants';
import { useRecoilValue } from 'recoil';
import { roomInfoState } from '@/utils/recoil/socket';

interface TimerProps {
  active: boolean;
}

export default function useTimer({ active }: TimerProps) {
  const { limitTime } = useRecoilValue(roomInfoState);
  const timerId = useRef<NodeJS.Timer | null>(null);
  const [timer, setTimer] = useState((limitTime - 1) * SEC);

  useEffect(() => {
    if (active) start();
    else stop();
  }, [active, limitTime]);

  const clearTimer = useCallback(() => {
    setTimer((limitTime - 1) * SEC);
    if (timerId.current) clearInterval(timerId.current);
  }, [limitTime]);

  const start = useCallback(() => {
    timerId.current = setInterval(() => {
      setTimer((prev) => {
        if (prev - SEC <= 0) return 0;
        return prev - SEC;
      });
    }, SEC);
  }, [setTimer, clearTimer, limitTime]);

  const stop = useCallback(() => {
    setTimer((limitTime - 1) * SEC);
    clearTimer();
  }, [limitTime, clearTimer]);

  return { timer };
}
