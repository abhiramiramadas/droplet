import React from 'react';
import { motion } from 'framer-motion';

interface WaterProgressProps {
  current: number;
  goal: number;
  onAddWater: () => void;
}

export const WaterProgress: React.FC<WaterProgressProps> = ({
  current,
  goal,
  onAddWater,
}) => {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div className="relative w-full h-48 bg-blue-50 dark:bg-blue-900/20 rounded-lg overflow-hidden">
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-blue-500/50 backdrop-blur-sm"
        initial={{ height: 0 }}
        animate={{ height: `${percentage}%` }}
        transition={{ duration: 0.5 }}
      />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl font-bold text-blue-600 dark:text-blue-300">
          {current}ml
        </div>
        <div className="text-sm text-blue-500 dark:text-blue-400">
          of {goal}ml daily goal
        </div>
        <button
          onClick={onAddWater}
          className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full
            shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
        >
          Add Water
        </button>
      </div>
    </div>
  );
};