import React from 'react';
import { motion } from 'framer-motion';
import { Room, MemoryItem } from '../types';
import { Brain, Star, Clock, Tag } from 'lucide-react';

interface RoomViewProps {
  room: Room;
  onItemClick: (item: MemoryItem) => void;
}

export const RoomView: React.FC<RoomViewProps> = ({ room, onItemClick }) => {
  return (
    <div className="relative w-full h-[600px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
      <img
        src={room.imageUrl}
        alt={room.name}
        className="w-full h-full object-cover opacity-50"
      />
      
      {room.items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute cursor-pointer"
          style={{
            left: `${item.position.x}%`,
            top: `${item.position.y}%`,
          }}
          whileHover={{ scale: 1.1 }}
          onClick={() => onItemClick(item)}
        >
          <div className="relative group">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            
            <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 hidden group-hover:block">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-3 w-64">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>{item.retentionScore}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{item.reviewCount} reviews</span>
                  </div>
                </div>
                {item.tags.length > 0 && (
                  <div className="flex items-center gap-1 mt-2 text-xs">
                    <Tag className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <div className="flex gap-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};