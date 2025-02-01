import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WaterLog, DailyGoal, Character, ReminderSettings } from '../types';
import { startOfToday, format, parseISO, isWithinInterval } from 'date-fns';

interface WaterState {
  logs: WaterLog[];
  dailyGoals: DailyGoal[];
  character: Character;
  reminderSettings: ReminderSettings;
  addWater: (amount: number) => void;
  setDailyGoal: (amount: number) => void;
  levelUpCharacter: () => void;
  updateCharacterMood: () => void;
  getDailyProgress: () => { current: number; goal: number; percentage: number };
  updateReminderSettings: (settings: Partial<ReminderSettings>) => void;
  shouldShowReminder: () => boolean;
  updateLastNotification: () => void;
}

export const useWaterStore = create<WaterState>()(
  persist(
    (set, get) => ({
      logs: [],
      dailyGoals: [],
      character: {
        name: 'Droplet',
        level: 1,
        exp: 0,
        mood: 'neutral',
        customizations: {
          color: '#60A5FA',
        },
      },
      reminderSettings: {
        enabled: true,
        startTime: '09:00',
        endTime: '22:00',
        interval: 60,
        smartReminders: true,
      },

      addWater: (amount) => {
        const newLog: WaterLog = {
          id: Date.now().toString(),
          amount,
          timestamp: new Date(),
        };

        set((state) => {
          const today = format(new Date(), 'yyyy-MM-dd');
          const todayGoal = state.dailyGoals.find((g) => g.date === today) || {
            date: today,
            goal: 2000,
            achieved: 0,
          };

          const updatedGoals = state.dailyGoals.filter((g) => g.date !== today);
          const newAchieved = todayGoal.achieved + amount;
          
          const newExp = state.character.exp + Math.floor(amount / 100);
          const shouldLevelUp = newExp >= state.character.level * 1000;
          
          return {
            logs: [...state.logs, newLog],
            dailyGoals: [
              ...updatedGoals,
              { ...todayGoal, achieved: newAchieved },
            ],
            character: {
              ...state.character,
              exp: shouldLevelUp ? 0 : newExp,
              level: shouldLevelUp ? state.character.level + 1 : state.character.level,
            },
          };
        });

        get().updateCharacterMood();
      },

      setDailyGoal: (amount) => {
        const today = format(new Date(), 'yyyy-MM-dd');
        set((state) => ({
          dailyGoals: [
            ...state.dailyGoals.filter((g) => g.date !== today),
            { date: today, goal: amount, achieved: 0 },
          ],
        }));
      },

      levelUpCharacter: () => {
        set((state) => ({
          character: {
            ...state.character,
            level: state.character.level + 1,
            exp: 0,
          },
        }));
      },

      updateCharacterMood: () => {
        const { current, percentage } = get().getDailyProgress();
        set((state) => ({
          character: {
            ...state.character,
            mood: percentage >= 80 ? 'happy' : percentage >= 40 ? 'neutral' : 'sad',
          },
        }));
      },

      getDailyProgress: () => {
        const state = get();
        const today = format(new Date(), 'yyyy-MM-dd');
        const todayGoal = state.dailyGoals.find((g) => g.date === today) || {
          date: today,
          goal: 2000,
          achieved: 0,
        };

        return {
          current: todayGoal.achieved,
          goal: todayGoal.goal,
          percentage: (todayGoal.achieved / todayGoal.goal) * 100,
        };
      },

      updateReminderSettings: (settings) => {
        set((state) => ({
          reminderSettings: {
            ...state.reminderSettings,
            ...settings,
          },
        }));
      },

      shouldShowReminder: () => {
        const state = get();
        const now = new Date();
        const settings = state.reminderSettings;
        
        if (!settings.enabled) return false;
        if (!settings.lastNotification) return true;

        const [startHour, startMinute] = settings.startTime.split(':').map(Number);
        const [endHour, endMinute] = settings.endTime.split(':').map(Number);
        const startTime = new Date(now).setHours(startHour, startMinute, 0);
        const endTime = new Date(now).setHours(endHour, endMinute, 0);

        const isWithinActiveHours = isWithinInterval(now, {
          start: new Date(startTime),
          end: new Date(endTime),
        });

        if (!isWithinActiveHours) return false;

        const timeSinceLastNotification = now.getTime() - new Date(settings.lastNotification).getTime();
        const intervalMs = settings.interval * 60 * 1000;

        if (settings.smartReminders) {
          const { percentage } = get().getDailyProgress();
          if (percentage < 50) {
            return timeSinceLastNotification >= intervalMs * 0.8; // More frequent if behind
          }
        }

        return timeSinceLastNotification >= intervalMs;
      },

      updateLastNotification: () => {
        set((state) => ({
          reminderSettings: {
            ...state.reminderSettings,
            lastNotification: new Date(),
          },
        }));
      },
    }),
    {
      name: 'water-storage',
    }
  )
);