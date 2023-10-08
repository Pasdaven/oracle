interface CountdownTimerProps {
  second: number;
}

const CountdownTimer = ({ second }: CountdownTimerProps) => {
  const minutes = Math.floor(second / 60);
  const seconds = second % 60;

  return (
    <div>
      <p>{`${minutes} min ${seconds} sec`}</p>
    </div>
  );
};

export default CountdownTimer;
