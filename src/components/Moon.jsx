import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

const Moon = () => {
  const [days, setDays] = useState(10);
  const [inputValue, setInputValue] = useState('10');
  const [currentDay, setCurrentDay] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  // Load saved values from localStorage on component mount
  useEffect(() => {
    const savedDays = localStorage.getItem('moonDays');
    const savedCurrentDay = localStorage.getItem('moonCurrentDay');
    
    if (savedDays) {
      setDays(parseInt(savedDays));
      setInputValue(savedDays);
    }
    if (savedCurrentDay) {
      setCurrentDay(parseInt(savedCurrentDay));
    }
  }, []);

  // Save to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem('moonDays', days.toString());
  }, [days]);

  useEffect(() => {
    localStorage.setItem('moonCurrentDay', currentDay.toString());
  }, [currentDay]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Allow typing decimal values
    if (value === '' || value === '.') {
      return;
    }
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 100) {
      setDays(numValue);
      // Reset current day when changing total days
      setCurrentDay(1);
    }
  };

  const handleInputBlur = () => {
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue) || numValue < 1 || numValue > 100) {
      setInputValue(days.toString());
    }
  };

  // Calculate tree growth percentage
  const treeGrowthPercentage = (currentDay / days) * 100;

  // Generate scale markings
  const generateScaleMarkings = () => {
    const markings = [];
    for (let i = 1; i <= days; i++) {
      const isCurrentDay = i === currentDay;
      const isPastDay = i <= currentDay;
      
      markings.push(
        <div key={i} className="flex items-center">
          <div className={`w-3 h-0.5 ${isCurrentDay ? 'bg-blue-500' : isPastDay ? 'bg-green-500' : 'bg-gray-400'} mr-2`}></div>
          <span className={`text-sm font-medium ${isCurrentDay ? 'text-blue-600' : isPastDay ? 'text-green-600' : 'text-gray-600'}`}>
            {days - i + 1}
          </span>
        </div>
      );
    }
    return markings;
  };

  // Play growth simulation
  const playGrowthSimulation = () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    setCurrentDay(1);
    
    const interval = setInterval(() => {
      setCurrentDay(prev => {
        if (prev >= days) {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1000); // 1 second per day
    
    return () => clearInterval(interval);
  };

  // Tree SVG paths
  const getTreePaths = () => {
    const trunkHeight = Math.max(20, treeGrowthPercentage * 1.8); // Scale to match the 384px height
    const leavesHeight = Math.max(10, treeGrowthPercentage * 0.4); // Proportional leaves height
    
    return {
      trunk: `M50 200 L50 ${200 - trunkHeight} L45 ${200 - trunkHeight} L45 200 Z`,
      leaves: `M50 ${200 - trunkHeight} C30 ${200 - trunkHeight - leavesHeight} 30 ${200 - trunkHeight - leavesHeight * 2} 50 ${200 - trunkHeight - leavesHeight * 2} C70 ${200 - trunkHeight - leavesHeight * 2} 70 ${200 - trunkHeight - leavesHeight} 50 ${200 - trunkHeight - leavesHeight}`
    };
  };

  const treePaths = getTreePaths();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-[2000px] p-8 relative">
        <div className="text-center mb-8">
          <h1 className="text-7xl font-bold text-gray-700 mb-2">
            MOON
          </h1>
          <h2 className="text-xl font-medium text-blue-500">
            - Growing Tree -
          </h2>
        </div>

        {/* Current Day Display */}
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-green-600 mb-2">
            Day {currentDay} of {days}
          </div>
          <div className="text-sm text-gray-500">
            {Math.round(treeGrowthPercentage)}% Grown
          </div>
        </div>

        {/* Play Button */}
        <div className="text-center mb-6">
          <button
            onClick={playGrowthSimulation}
            disabled={isPlaying}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              isPlaying 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-green-600 text-white hover:bg-green-700 hover:scale-105'
            }`}
          >
            <Play size={20} className="inline mr-2" />
            {isPlaying ? 'Growing...' : 'Play Growth'}
          </button>
        </div>

        {/* Input Field */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2">
            <input
              id="daysInput"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="w-24 text-center text-xl font-bold text-blue-600 bg-transparent border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-2"
              placeholder="10"
            />
            <span className="text-xl font-medium text-gray-700">days</span>
          </div>
        </div>

        {/* Scale Container */}
        <div className="flex items-start justify-center space-x-8">
          {/* Vertical Scale */}
          <div className="flex flex-col items-center">
            <div className="w-0.5 bg-gray-400 h-96 relative">
              {/* Scale markings */}
              <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-between">
                {generateScaleMarkings()}
              </div>
            </div>
          </div>

          {/* Tree SVG */}
          <div className="flex-1 flex justify-center mt-24">
            <svg width="200" height="300" viewBox="0 0 100 200" className="overflow-visible">
              {/* Ground */}
              <rect x="0" y="200" width="100" height="10" fill="#8B4513" />
              
              {/* Tree Trunk */}
              <path
                d={treePaths.trunk}
                fill="#8B4513"
                stroke="#654321"
                strokeWidth="1"
                className="transition-all duration-1000 ease-out"
              />
              
              {/* Tree Leaves */}
              <path
                d={treePaths.leaves}
                fill="#228B22"
                stroke="#006400"
                strokeWidth="1"
                className="transition-all duration-1000 ease-out"
              />
              
              {/* Growth indicator line */}
              <line
                x1="50"
                y1="200"
                x2="50"
                y2={200 - (treeGrowthPercentage * 1.8)}
                stroke="#FFD700"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moon;
