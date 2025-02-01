import React from 'react';
import { useWaterStore } from '../store/waterStore';
import { Bell, BellOff, Brain } from 'lucide-react';

export const ReminderSettings: React.FC = () => {
  const { reminderSettings, updateReminderSettings } = useWaterStore();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-white">
          Reminder Settings
        </h3>
        <button
          onClick={() => updateReminderSettings({ enabled: !reminderSettings.enabled })}
          className={`p-2 rounded-lg transition-colors ${
            reminderSettings.enabled
              ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
          }`}
        >
          {reminderSettings.enabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Start Time
            </label>
            <input
              type="time"
              value={reminderSettings.startTime}
              onChange={(e) => updateReminderSettings({ startTime: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              End Time
            </label>
            <input
              type="time"
              value={reminderSettings.endTime}
              onChange={(e) => updateReminderSettings({ endTime: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Reminder Interval
          </label>
          <select
            value={reminderSettings.interval}
            onChange={(e) => updateReminderSettings({ interval: Number(e.target.value) })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value={30}>Every 30 minutes</option>
            <option value={60}>Every hour</option>
            <option value={90}>Every 1.5 hours</option>
            <option value={120}>Every 2 hours</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Smart Reminders
            </span>
          </div>
          <button
            onClick={() => updateReminderSettings({ smartReminders: !reminderSettings.smartReminders })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              reminderSettings.smartReminders ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                reminderSettings.smartReminders ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};