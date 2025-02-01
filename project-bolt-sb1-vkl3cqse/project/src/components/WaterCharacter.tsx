import React from 'react';
import { motion } from 'framer-motion';
import { Droplet } from 'lucide-react';

interface WaterCharacterProps {
  mood: 'happy' | 'neutral' | 'sad';
  level: number;
  color: string;
  scale?: number;
}

export const WaterCharacter: React.FC<WaterCharacterProps> = ({
  mood,
  level,
  color,
  scale = 1,
}) => {
  const expressions = {
    happy: '^ ^',
    neutral: '• •',
    sad: '. .',
  };

  return (
    <motion.div
      className="relative"
      animate={{ scale: [scale, scale * 1.05, scale] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <Droplet
        className="w-24 h-24"
        style={{ color }}
        fill={color}
        strokeWidth={1.5}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="text-lg font-bold mb-1">{expressions[mood]}</div>
        <div className="text-xs font-semibold">Lv.{level}</div>
      </div>
    </motion.div>
  );
};