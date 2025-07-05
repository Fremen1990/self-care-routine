import { useState, useCallback, useMemo } from "react";
import { RoutineTask } from "@repo/types/routine";
import { RoutineService } from "@repo/services/routine-service";

export function useRoutine() {
  const [finishBy, setFinishBy] = useState("09:00");
  const [morningTasks, setMorningTasks] = useState<RoutineTask[]>(() =>
    RoutineService.calculateMorningTimes(finishBy),
  );
  const [eveningTasks, setEveningTasks] = useState<RoutineTask[]>(
    RoutineService.EVENING_TASKS.map((t) => ({ ...t, completed: false })),
  );

  const toggleTask = useCallback((taskId: string, isEvening = false) => {
    const setter = isEvening ? setEveningTasks : setMorningTasks;
    setter((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }, []);

  const resetMorning = useCallback(() => {
    setMorningTasks((prev) =>
      prev.map((task) => ({ ...task, completed: false })),
    );
  }, []);

  const resetEvening = useCallback(() => {
    setEveningTasks((prev) =>
      prev.map((task) => ({ ...task, completed: false })),
    );
  }, []);

  const updateFinishBy = useCallback((time: string) => {
    setFinishBy(time);
    setMorningTasks(RoutineService.calculateMorningTimes(time));
  }, []);

  const morningProgress = useMemo(
    () => RoutineService.calculateProgress(morningTasks),
    [morningTasks],
  );

  const eveningProgress = useMemo(
    () => RoutineService.calculateProgress(eveningTasks),
    [eveningTasks],
  );

  const sleepTimes = useMemo(() => {
    const firstTask = morningTasks[0];
    return firstTask
      ? RoutineService.calculateSleepTimes(firstTask.time)
      : { sevenHalf: "", eight: "" };
  }, [morningTasks]);

  return {
    finishBy,
    morningTasks,
    eveningTasks,
    morningProgress,
    eveningProgress,
    sleepTimes,
    toggleTask,
    resetMorning,
    resetEvening,
    updateFinishBy,
  };
}
