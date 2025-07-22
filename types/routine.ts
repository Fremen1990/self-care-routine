export interface CompletionData {
  morningProgress: number;
  eveningProgress: number;
  morningTasks: RoutineTask[];
  eveningTasks: RoutineTask[];
  completedAt: string;
}

export interface SleepTimes {
  sevenHalf: string;
  eight: string;
}

export interface RoutineTask {
  id: string;
  time: string; // HH:mm format
  title: string;
  description: string;
  duration: number; // in minutes
  icon: string;
  completed: boolean;
}

export interface RoutineSchedule {
  id: string;
  name: "morning" | "evening";
  tasks: RoutineTask[];
  startTime: string; // HH:mm format
  workStartTime?: string; // For morning routine
  totalDuration: number; // in minutes
}

export interface SleepSchedule {
  sleepTime7_5: string;
  sleepTime8: string;
  wakeUpTime: string;
}

export interface RoutineState {
  morningRoutine: RoutineSchedule;
  eveningRoutine: RoutineSchedule;
  sleepSchedule: SleepSchedule;
  currentTab: "morning" | "evening";
}

export interface RoutineTip {
  id: string;
  icon: string;
  title: string;
  description: string;
  category: "morning" | "evening" | "both";
}
