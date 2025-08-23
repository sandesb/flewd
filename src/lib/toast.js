import toast from 'react-hot-toast';

// Toast types with different styles and icons
export const toastTypes = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
};

// Toast configurations
const toastConfigs = {
  [toastTypes.SUCCESS]: {
    style: {
      background: '#FFCE1B',
      color: '#ffffff',
      marginTop: '20px',
    },
    iconTheme: {
      primary: '#ffffff',
      secondary: '#10b981'
    }
  },
  [toastTypes.ERROR]: {
    style: {
      background: '#ef4444',
      color: '#ffffff',
      marginTop: '20px',

    },
    iconTheme: {
      primary: '#ffffff',
      secondary: '#ef4444'
    }
  },
  [toastTypes.INFO]: {
    style: {
      background: '#3b82f6',
      color: '#ffffff',
      marginTop: '20px',

    },
    iconTheme: {
      primary: '#ffffff',
      secondary: '#3b82f6'
    }
  },
  [toastTypes.WARNING]: {
    style: {
      background: '#f59e0b',
      color: '#ffffff',
      marginTop: '20px',

      },
    iconTheme: {
      primary: '#ffffff',
      secondary: '#f59e0b'
    }
  }
};

// Dynamic toast function
export const showToast = (message, type = toastTypes.INFO, duration = 3000) => {
  const config = toastConfigs[type] || toastConfigs[toastTypes.INFO];
  
  return toast(message, {
    duration,
    ...config,
    position: 'top-center',
    className: 'font-medium'
  });
};

// Specific toast functions for common use cases
export const showWaterAddedToast = (amount) => {
  showToast(`+${amount}L water added!`, toastTypes.SUCCESS, 2000);
};

export const showWaterResetToast = () => {
  showToast('Water consumption reset! 🔄', toastTypes.INFO, 2000);
};

export const showGoalAchievedToast = () => {
  showToast('🎉 Daily goal achieved! You\'re hydrated!', toastTypes.SUCCESS, 4000);
};

export const showSettingsSavedToast = () => {
  showToast('Settings saved successfully! ⚙️', toastTypes.SUCCESS, 2000);
};

export const showGoalUpdatedToast = (newGoal) => {
  showToast(`Daily goal updated to ${newGoal}L 📊`, toastTypes.INFO, 2000);
};

export const showSleepTimeUpdatedToast = (newTime) => {
  showToast(`Sleep time updated to ${newTime} 😴`, toastTypes.INFO, 2000);
};

export const showWakeTimeUpdatedToast = (newTime) => {
  showToast(`Wake time updated to ${newTime} 🌅`, toastTypes.INFO, 2000);
};

// Export default toast for direct usage
export { toast };
