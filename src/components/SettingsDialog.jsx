import React, { useState } from 'react';
import { X, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  showSettingsSavedToast, 
  showGoalUpdatedToast, 
  showSleepTimeUpdatedToast, 
  showWakeTimeUpdatedToast 
} from '../lib/toast';

const SettingsDialog = ({ isOpen, onClose, dailyGoal, setDailyGoal, sleepTime, setSleepTime, wakeTime, setWakeTime }) => {
  const [localDailyGoal, setLocalDailyGoal] = useState(dailyGoal);
  const [localSleepTime, setLocalSleepTime] = useState(sleepTime);
  const [localWakeTime, setLocalWakeTime] = useState(wakeTime);
  const navigate = useNavigate();

  const handleSave = () => {
    // Check what changed and show appropriate toasts
    if (localDailyGoal !== dailyGoal) {
      showGoalUpdatedToast(localDailyGoal);
    }
    if (localSleepTime !== sleepTime) {
      showSleepTimeUpdatedToast(localSleepTime);
    }
    if (localWakeTime !== wakeTime) {
      showWakeTimeUpdatedToast(localWakeTime);
    }

    // Update all values
    setDailyGoal(localDailyGoal);
    setSleepTime(localSleepTime);
    setWakeTime(localWakeTime);
    
    // Show general save toast
    showSettingsSavedToast();
    onClose();
  };

  const handleCancel = () => {
    setLocalDailyGoal(dailyGoal);
    setLocalSleepTime(sleepTime);
    setLocalWakeTime(wakeTime);
    onClose();
  };

  const handleMoonClick = () => {
    onClose(); // Close settings dialog
    navigate('/moon'); // Navigate to moon page
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 max-w-[90vw]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
          <div className="flex items-center space-x-2">
            {/* Moon Navigation Button */}
            <button
              onClick={handleMoonClick}
              className="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-all duration-200"
              title="Go to Moon Page"
            >
              <Moon size={20} />
            </button>
            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Daily Goal */}
          <div>
            <label htmlFor="dailyGoal" className="block text-sm font-medium text-gray-700 mb-2">
              Daily Goal (Liters)
            </label>
            <input
              id="dailyGoal"
              type="number"
              min="0.5"
              max="10"
              step="0.1"
              value={localDailyGoal}
              onChange={(e) => setLocalDailyGoal(parseFloat(e.target.value) || 0.5)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Sleep Time */}
          <div>
            <label htmlFor="sleepTime" className="block text-sm font-medium text-gray-700 mb-2">
              Sleep Time
            </label>
            <input
              id="sleepTime"
              type="time"
              value={localSleepTime}
              onChange={(e) => setLocalSleepTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Wake Time */}
          <div>
            <label htmlFor="wakeTime" className="block text-sm font-medium text-gray-700 mb-2">
              Wake Up Time
            </label>
            <input
              id="wakeTime"
              type="time"
              value={localWakeTime}
              onChange={(e) => setLocalWakeTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-3 mt-8">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsDialog;
