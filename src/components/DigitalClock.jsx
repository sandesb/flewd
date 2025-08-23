import React, { useState, useEffect } from 'react';

const DigitalClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time for Nepal timezone (UTC+5:45)
  const formatNepalTime = (date) => {
    // Create a new date object for Nepal timezone
    const nepalTime = new Date(date.toLocaleString("en-US", {timeZone: "Asia/Kathmandu"}));
    
    const timeString = nepalTime.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Kathmandu',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    const dateString = nepalTime.toLocaleDateString('en-US', {
      timeZone: 'Asia/Kathmandu',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    return { timeString, dateString };
  };

  const { timeString, dateString } = formatNepalTime(currentTime);

  return (
    <div className="text-center mb-6">
      <div className="text-4xl font-bold text-gray-800 mb-2 font-mono">
        {timeString}
      </div>
      <div className="text-lg text-gray-600">
        {dateString}
      </div>
    </div>
  );
};

export default DigitalClock;
