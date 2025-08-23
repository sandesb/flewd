import React, { useState, useEffect } from 'react';
import DigitalClock from './DigitalClock';
import WaterGoalConsumption from './WaterGoalConsumption';
import QuickWaterButtons from './QuickWaterButtons';
import BodySilhouette from './BodySilhouette';
import WaterLevelControl from './WaterLevelControl';

const HumanBodyWaterFill = () => {
  const [waterGoal, setWaterGoal] = useState(3); // Default 3 liters
  const [waterConsumed, setWaterConsumed] = useState(0); // Liters consumed
  const [animatedLevel, setAnimatedLevel] = useState(0);

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
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-7xl font-bold text-gray-700 mb-2">
            FLEWD
          </h1>
          <h2 className="text-xl font-medium text-blue-500">
            - Body Hydration Tracker -
          </h2>
        </div>

        <DigitalClock />
        
        <WaterGoalConsumption 
          waterGoal={waterGoal}
          setWaterGoal={setWaterGoal}
          waterConsumed={waterConsumed}
        />

        <QuickWaterButtons setWaterConsumed={setWaterConsumed} />

        <BodySilhouette animatedLevel={animatedLevel} />

        <WaterLevelControl 
          waterLevel={waterLevel}
          animatedLevel={animatedLevel}
          waterGoal={waterGoal}
          waterConsumed={waterConsumed}
          getProgressBarColor={getProgressBarColor}
        />
      </div>
    </div>
  );
};

export default HumanBodyWaterFill;