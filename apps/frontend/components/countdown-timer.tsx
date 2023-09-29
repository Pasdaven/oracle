import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  second: number;
}

const CountdownTimer = ({ second }: CountdownTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState(second);

  useEffect(() => {
    if (timeRemaining <= 0) {
      return;
    }

    const timerId = setTimeout(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeRemaining]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div>
      <p>{`${minutes} min ${seconds} sec`}</p>
    </div>
  );
};

export default CountdownTimer;
