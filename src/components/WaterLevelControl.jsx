import React, { useState, useEffect } from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

const WaterLevelControl = ({ waterLevel, animatedLevel, waterGoal, waterConsumed, getProgressBarColor }) => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  // Show confetti when water level reaches 100%
  useEffect(() => {
    if (waterLevel >= 100 && !showConfetti) {
      setShowConfetti(true);
      // Hide confetti after 5 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [waterLevel, showConfetti]);

  return (
    <>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-lg font-medium text-gray-700">
            Hydration Progress
          </label>
          <span className={`text-2xl font-bold ${
            waterLevel >= 70 ? 'text-green-500' : 
            waterLevel >= 40 ? 'text-yellow-500' : 'text-red-500'
          }`}>
            {Math.round(animatedLevel)}%
          </span>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-3">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>0L</span>
            <span>{waterGoal}L</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="h-3 rounded-full transition-all duration-300"
              style={{ 
                width: `${Math.min(waterLevel, 100)}%`,
                backgroundColor: getProgressBarColor(waterLevel)
              }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-500">
          <span>Dehydrated</span>
          <span>Optimal</span>
          <span>Hydrated</span>
        </div>

        {/* Status Message */}
        <div className="text-center p-3 rounded-lg">
          {waterLevel >= 100 && (
            <p className="text-green-600 font-medium text-lg">🎉 Congratulations! Daily goal achieved! 🎉</p>
          )}
          {waterLevel >= 70 && waterLevel < 100 && (
            <p className="text-green-600 font-medium">Great hydration! Keep it up! 💧</p>
          )}
          {waterLevel >= 40 && waterLevel < 70 && (
            <p className="text-yellow-600 font-medium">Good hydration level 👍</p>
          )}
          {waterLevel < 40 && (
            <p className="text-red-600 font-medium">Need more water! Stay hydrated 🚰</p>
          )}
        </div>

        {/* Remaining Water */}
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-gray-700">
            <span className="font-medium">
              {Math.max(0, waterGoal - waterConsumed).toFixed(1)}L
            </span> remaining today
          </p>
        </div>
      </div>
    </>
  );
};

export default WaterLevelControl;
