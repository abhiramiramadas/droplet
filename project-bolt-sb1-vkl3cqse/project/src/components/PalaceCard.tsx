import React from 'react';
import { motion } from 'framer-motion';
import { Palace } from '../types';
import { Brain, Clock, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

interface PalaceCardProps {
  palace: Palace;
  onClick: () => void;
}

export const PalaceCard: React.FC<PalaceCardProps> = ({ palace, onClick }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              {palace.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {palace.description}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-blue-500" />
            <span className="text-gray-600 dark:text-gray-300">
              {palace.totalItems} items
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-green-500" />
            <span className="text-gray-600 dark:text-gray-300">
              {format(palace.lastVisited, 'MMM d')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-xs text-white font-medium">
                {Math.round(palace.averageRetention)}%
              </span>
            </div>
            <span className="text-gray-600 dark:text-gray-300">retention</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};