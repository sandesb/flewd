import React, { useState, useEffect } from 'react';

const DigitalClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showCountdown, setShowCountdown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Show popup when component mounts
  useEffect(() => {
    setShowPopup(true);
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 1500);
    
    return () => clearTimeout(timer);
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

  // Calculate countdown to end of day
  const getCountdownToEndOfDay = () => {
    const nepalTime = new Date(currentTime.toLocaleString("en-US", {timeZone: "Asia/Kathmandu"}));
    const endOfDay = new Date(nepalTime);
    endOfDay.setHours(23, 59, 59, 999);
    
    const timeLeft = endOfDay - nepalTime;
    
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    return { hours, minutes, seconds };
  };

  const { timeString, dateString } = formatNepalTime(currentTime);
  const countdown = getCountdownToEndOfDay();

  const handleTimeClick = () => {
    setShowCountdown(!showCountdown);
  };

  return (
    <>
      {/* Popup Message */}
      {showPopup && (
        <div className="fixed top-48 left-1/2 transform -translate-x-1/2 z-50 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
          <p className="text-lg font-medium">Tap on the Time</p>
        </div>
      )}

      <div className="text-center mb-6">
        <div 
          className="text-4xl font-bold text-gray-800 mb-2 font-mono cursor-pointer hover:text-blue-600 transition-colors duration-200"
          onClick={handleTimeClick}
          title="Click to toggle countdown"
        >
          {timeString}
        </div>
        <div className="text-lg text-gray-600">
          {dateString}
        </div>
        
        {/* Countdown Display */}
        {showCountdown && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-600 font-medium mb-2">Time until end of day:</div>
            <div className="text-2xl font-bold text-blue-700 font-mono">
              {String(countdown.hours).padStart(2, '0')}:{String(countdown.minutes).padStart(2, '0')}:{String(countdown.seconds).padStart(2, '0')}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DigitalClock;
