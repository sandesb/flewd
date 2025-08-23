import React, { useState, useEffect } from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { showGoalAchievedToast } from '../lib/toast';

const WaterLevelControl = ({ waterLevel, animatedLevel, waterGoal, waterConsumed, getProgressBarColor }) => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  // Show confetti when water level reaches 100%
  useEffect(() => {
    if (waterLevel >= 100) {
      setShowConfetti(true);
      showGoalAchievedToast();
      // Hide confetti after 5 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [waterLevel]);

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

      <div className="mb-6">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Hydration Level</span>
            <span>{waterLevel.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${animatedLevel}%`,
                backgroundColor: getProgressBarColor(animatedLevel)
              }}
            />
          </div>
        </div>

        {/* Status Messages */}
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

        {/* Remaining Water Info */}
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-2">Daily Progress</div>
          <div className="text-2xl font-bold text-blue-600">
            {waterConsumed.toFixed(1)}L / {waterGoal}L
          </div>
        </div>
      </div>
    </>
  );
};

export default WaterLevelControl;

