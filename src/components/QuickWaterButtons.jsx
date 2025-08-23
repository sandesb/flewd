import React from 'react';

const QuickWaterButtons = ({ setWaterConsumed }) => {
  return (
    <div className="flex justify-center space-x-2 mb-6">
      {[0.25, 0.5, 1].map((amount) => (
        <button
          key={amount}
          onClick={() => setWaterConsumed(prev => Math.max(0, prev + amount))}
          className="px-4 py-2 text-white cursor-pointer rounded-lg bg-blue-600 hover:bg-blue-400 transition-colors duration-200 font-medium"
        >
          +{amount}L
        </button>
      ))}
      <button
        onClick={() => setWaterConsumed(0)}
        className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
      >
        Reset
      </button>
    </div>
  );
};

export default QuickWaterButtons;
