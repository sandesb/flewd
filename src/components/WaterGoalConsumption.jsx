import React, { useState } from 'react';

const WaterGoalConsumption = ({ waterGoal, setWaterGoal, waterConsumed }) => {
  const [inputValue, setInputValue] = useState(waterGoal.toString());

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Allow typing decimal values
    if (value === '' || value === '.') {
      return;
    }
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0.5 && numValue <= 10) {
      setWaterGoal(numValue);
    }
  };

  const handleInputBlur = () => {
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue) || numValue < 0.5 || numValue > 10) {
      // Reset to valid value if invalid
      setInputValue(waterGoal.toString());
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <label htmlFor="waterGoal" className="block text-sm font-medium text-gray-600 mb-2">
          Daily Goal
        </label>
        <div className="flex items-center justify-center space-x-2">
          <input
            id="waterGoal"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="w-16 text-center text-lg font-bold text-blue-600 bg-transparent border-none focus:outline-none"
            placeholder="3"
          />
          <span className="text-lg font-medium text-gray-700">L</span>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-4 text-center">
        <div className="text-sm font-medium text-gray-600 mb-2">Consumed</div>
        <div className="text-2xl font-bold text-blue-600">
          {waterConsumed.toFixed(1)}L
        </div>
      </div>
    </div>
  );
};

export default WaterGoalConsumption;
