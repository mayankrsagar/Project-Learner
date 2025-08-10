'use client';

import React, {
  useEffect,
  useState,
} from 'react';

const Timer = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date());
    updateTime(); // Initial set
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!currentTime) return null; // Prevent rendering during SSR

  return (
    <div className="flex items-center gap-2 font-mono text-sm text-gray-800 dark:text-gray-100">
      🕒 {currentTime.toLocaleTimeString()}
    </div>
  );
};

export default Timer;
