import React, { useState, useEffect } from 'react';
import { useWaterStore } from './store/waterStore';
import { WaterCharacter } from './components/WaterCharacter';
import { WaterProgress } from './components/WaterProgress';
import { ReminderSettings } from './components/ReminderSettings';
import { Moon, Sun, Trophy, Settings, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const {
    character,
    getDailyProgress,
    addWater,
    shouldShowReminder,
    updateLastNotification,
  } = useWaterStore();
  const progress = getDailyProgress();

  useEffect(() => {
    // Check for reminders every minute
    const interval = setInterval(() => {
      if (shouldShowReminder()) {
        const { percentage } = getDailyProgress();
        const message = percentage < 50
          ? "You're falling behind on your water goal! 💧"
          : "Time for some water! 💦";
        
        toast(message, {
          icon: '💧',
          duration: 5000,
        });
        updateLastNotification();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleAddWater = () => {
    addWater(250); // Add 250ml
    toast.success('Great job! Keep it up! 💧', {
      icon: '🌊',
    });
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 transition-colors duration-200">
      <Toaster position="top-right" />
      
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.h1
              className="text-2xl font-bold text-blue-600 dark:text-blue-400"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Droplet
            </motion.h1>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Trophy className="w-5 h-5 text-yellow-500" />
              </button>
              <button 
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-8">
        <AnimatePresence>
          {showSettings ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Settings</h2>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="p-4">
                  <ReminderSettings />
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="flex flex-col items-center space-y-8">
          <WaterCharacter
            mood={character.mood}
            level={character.level}
            color={character.customizations.color}
            scale={1.5}
          />
          
          <div className="w-full space-y-2">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Today's Progress
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {progress.percentage >= 100
                    ? "You've reached your goal! 🎉"
                    : `${Math.round(progress.percentage)}% of daily goal`}
                </p>
              </div>
              <motion.div
                className="text-xs font-medium text-blue-500 dark:text-blue-400"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Level {character.level}
              </motion.div>
            </div>
            
            <WaterProgress
              current={progress.current}
              goal={progress.goal}
              onAddWater={handleAddWater}
            />
          </div>

          <div className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
              Quick Add
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {[100, 250, 500].map((amount) => (
                <button
                  key={amount}
                  onClick={() => addWater(amount)}
                  className="py-2 px-4 bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200
                    dark:hover:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg
                    transition-colors duration-200"
                >
                  {amount}ml
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;