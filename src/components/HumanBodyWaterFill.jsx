import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import DigitalClock from './DigitalClock';
import WaterGoalConsumption from './WaterGoalConsumption';
import QuickWaterButtons from './QuickWaterButtons';
import BodySilhouette from './BodySilhouette';
import WaterLevelControl from './WaterLevelControl';
import SettingsDialog from './SettingsDialog';

const HumanBodyWaterFill = () => {
  const [waterGoal, setWaterGoal] = useState(3); // Default 3 liters
  const [waterConsumed, setWaterConsumed] = useState(0); // Liters consumed
  const [animatedLevel, setAnimatedLevel] = useState(0);
  const [sleepTime, setSleepTime] = useState('22:00'); // Default 10:00 PM
  const [wakeTime, setWakeTime] = useState('06:00'); // Default 6:00 AM
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load saved values from localStorage on component mount
  useEffect(() => {
    const savedWaterConsumed = localStorage.getItem('waterConsumed');
    const savedWaterGoal = localStorage.getItem('waterGoal');
    const savedSleepTime = localStorage.getItem('sleepTime');
    const savedWakeTime = localStorage.getItem('wakeTime');
    
    if (savedWaterConsumed) {
      setWaterConsumed(parseFloat(savedWaterConsumed));
    }
    if (savedWaterGoal) {
      setWaterGoal(parseFloat(savedWaterGoal));
    }
    if (savedSleepTime) {
      setSleepTime(savedSleepTime);
    }
    if (savedWakeTime) {
      setWakeTime(savedWakeTime);
    }
  }, []);

  // Save water goal to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('waterGoal', waterGoal.toString());
  }, [waterGoal]);

  // Save sleep and wake times to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('sleepTime', sleepTime);
  }, [sleepTime]);

  useEffect(() => {
    localStorage.setItem('wakeTime', wakeTime);
  }, [wakeTime]);

  // Calculate percentage based on consumed vs goal
  const waterLevel = Math.min((waterConsumed / waterGoal) * 100, 100);

  // Function to get progress bar color based on hydration level
  const getProgressBarColor = (level) => {
    if (level < 40) return '#ef4444'; // red-500 for dehydrated
    if (level < 70) return '#22c55e'; // green-500 for optimal
    return '#3b82f6'; // blue-500 for hydrated
  };

  // Smooth animation for water level changes
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedLevel(prev => {
        const diff = waterLevel - prev;
        if (Math.abs(diff) < 0.5) return waterLevel;
        return prev + diff * 0.1;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [waterLevel]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
        {/* Settings Button */}
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="absolute top-6 right-6 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
          title="Settings"
        >
          <Settings size={24} />
        </button>

        <div className="text-center mb-8">
          <h1 className="text-7xl font-bold text-gray-700 mb-2">
            FLEWD
          </h1>
          <h2 className="text-xl font-medium text-blue-500">
            - Body Hydration Tracker -
          </h2>
        </div>

        <DigitalClock sleepTime={sleepTime} wakeTime={wakeTime} />
        
        <WaterGoalConsumption 
          waterGoal={waterGoal}
          waterConsumed={waterConsumed}
        />

        <QuickWaterButtons 
          setWaterConsumed={setWaterConsumed} 
          waterConsumed={waterConsumed}
        />

        <BodySilhouette animatedLevel={animatedLevel} />

        <WaterLevelControl 
          waterLevel={waterLevel}
          animatedLevel={animatedLevel}
          waterGoal={waterGoal}
          waterConsumed={waterConsumed}
          getProgressBarColor={getProgressBarColor}
        />

        {/* Settings Dialog */}
        <SettingsDialog
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          dailyGoal={waterGoal}
          setDailyGoal={setWaterGoal}
          sleepTime={sleepTime}
          setSleepTime={setSleepTime}
          wakeTime={wakeTime}
          setWakeTime={setWakeTime}
        />
      </div>
    </div>
  );
};

export default HumanBodyWaterFill;