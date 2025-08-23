import React from 'react';

const WaterGoalConsumption = ({ waterGoal, waterConsumed }) => {
  const remainingWater = Math.max(0, waterGoal - waterConsumed);

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-blue-50 rounded-lg p-4 text-center">
        <div className="text-sm font-medium text-gray-600 mb-2">Consumed</div>
        <div className="text-2xl font-bold text-blue-600">
          {waterConsumed.toFixed(1)}L
        </div>
      </div>
      
      <div className="bg-green-50 rounded-lg p-4 text-center">
        <div className="text-sm font-medium text-gray-600 mb-2">Remaining</div>
        <div className="text-2xl font-bold text-red-400">
          {remainingWater.toFixed(1)}L
        </div>
      </div>
    </div>
  );
};

export default WaterGoalConsumption;
