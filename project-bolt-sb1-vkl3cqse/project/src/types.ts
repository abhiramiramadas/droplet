export interface WaterLog {
  id: string;
  amount: number;
  timestamp: Date;
}

export interface DailyGoal {
  date: string;
  goal: number;
  achieved: number;
}

export interface Character {
  name: string;
  level: number;
  exp: number;
  mood: 'happy' | 'neutral' | 'sad';
  customizations: {
    color: string;
    accessory?: string;
  };
}

export interface ReminderSettings {
  enabled: boolean;
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  interval: number; // minutes
  smartReminders: boolean;
  lastNotification?: Date;
}