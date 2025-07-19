import React from "react";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { cn } from "@repo/ui/lib/utils";

interface RoutineTaskItemProps {
  task: {
    id: string;
    time: string;
    title: string;
    description: string;
    duration?: number;
    icon: string;
    completed: boolean;
  };
  onToggle: (taskId: string) => void;
}

export function RoutineTaskItem({ task, onToggle }: RoutineTaskItemProps) {
  return (
    <div
      className={cn(
        "flex items-start space-x-3 p-4 rounded-lg transition-all duration-200 ease-in-out",
        task.completed ? "opacity-60 bg-muted/50" : "bg-card",
        "hover:bg-green-100 dark:hover:bg-green-950", // Solid colors
        "hover:scale-[1.01] hover:shadow-md", // Subtle scale and shadow animation
      )}
    >
      <Checkbox
        id={task.id}
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="mt-1"
      />
      <div className="flex-1">
        <label
          htmlFor={task.id}
          className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          <span className="text-2xl">{task.icon}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className={cn(task.completed && "line-through")}>
                {task.title}
              </span>
              {task.time && (
                <span className="text-xs text-muted-foreground">
                  {task.time}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {task.description}
            </p>
            {task.duration && (
              <p className="text-xs text-muted-foreground">
                {task.duration} min
              </p>
            )}
          </div>
        </label>
      </div>
    </div>
  );
}
