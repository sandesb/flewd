import React from 'react';

const QuickWaterButtons = ({ setWaterConsumed }) => {
  return (
    <div className="flex justify-center space-x-3 mb-6">
      {[0.25, 0.5, 1].map((amount) => (
        <button
          key={amount}
          onClick={() => setWaterConsumed(prev => Math.max(0, prev + amount))}
          className="rounded relative inline-flex group items-center justify-center px-5 py-2.5 cursor-pointer border-b-4 border-l-2 active:border-blue-600 active:shadow-none shadow-lg bg-gradient-to-tr from-blue-600 to-blue-500 border-blue-700 text-white"
        >
          <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white group-hover:w-full group-hover:h-full opacity-10"></span>
          <span className="relative">+{amount}L</span>
        </button>
      ))}
      <button
        onClick={() => setWaterConsumed(0)}
        className="rounded relative inline-flex group items-center justify-center px-5 py-2.5 cursor-pointer border-b-4 border-l-2 active:border-red-600 active:shadow-none shadow-lg bg-gradient-to-tr from-red-600 to-red-500 border-red-700 text-white"
      >
        <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white group-hover:w-full group-hover:h-full opacity-10"></span>
        <span className="relative">Reset</span>
      </button>
    </div>
  );
};

export default QuickWaterButtons;
