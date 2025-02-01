import React from 'react';
import { Column } from '../types';
import { TaskCard } from './TaskCard';
import { useDroppable } from '@dnd-kit/core';

interface TaskColumnProps {
  column: Column;
  onTaskEdit: (taskId: string) => void;
}

export const TaskColumn: React.FC<TaskColumnProps> = ({ column, onTaskEdit }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 min-w-[300px]">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        {column.title}
        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
          ({column.tasks.length})
        </span>
      </h2>
      
      <div ref={setNodeRef} className="space-y-4">
        {column.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => onTaskEdit(task.id)}
          />
        ))}
      </div>
    </div>
  );
};