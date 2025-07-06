// Store-specific interface
import { CompletionData, RoutineTask, SleepTimes } from "./routine";

export interface RoutineStore {
  // State
  finishBy: string;
  morningTasks: RoutineTask[];
  eveningTasks: RoutineTask[];
  completionHistory: Record<string, CompletionData>;

  // Computed values (getters)
  morningProgress: number;
  eveningProgress: number;
  sleepTimes: SleepTimes;

  // Actions
  toggleTask: (taskId: string, isEvening?: boolean) => void;
  resetMorning: () => void;
  resetEvening: () => void;
  updateFinishBy: (time: string) => void;
  saveCompletion: () => void;
  reorderTasks: (taskIds: string[], isEvening?: boolean) => void;
}
