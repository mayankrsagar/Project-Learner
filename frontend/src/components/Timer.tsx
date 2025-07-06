import React, {
  useEffect,
  useState,
} from 'react';

const Timer = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-mono text-sm text-gray-700 dark:text-gray-300" suppressHydrationWarning={true}>
      {currentTime.toLocaleTimeString()}
    </div>
  );
};

export default Timer;
