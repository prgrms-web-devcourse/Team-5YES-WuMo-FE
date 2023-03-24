import { Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type TimerProps = {
  certifyEmail: boolean;
  setPinShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const Timer = ({ certifyEmail, setPinShow }: TimerProps) => {
  const MINUTES_IN_MS = 3 * 60 * 1000;
  const INTERVAL = 1000;
  const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);

  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - INTERVAL);
    }, INTERVAL);

    if (timeLeft <= 0) {
      clearInterval(timer);
      setPinShow(false);
    }

    if (certifyEmail) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  return (
    <Text fontSize='xs' pr='2'>
      {minutes}:{second}
    </Text>
  );
};

export default Timer;
