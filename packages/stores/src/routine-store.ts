import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { RoutineStore } from "@repo/types";
import { RoutineService } from "@repo/services";

export const routineStore = create<RoutineStore>()(
  persist(
    (set, get) => ({
      // Initial state
      finishBy: "09:00",
      morningTasks: RoutineService.calculateMorningTimes("09:00"),
      eveningTasks: RoutineService.getEveningTasksWithCompletion(),

      morningProgress: 0,
      eveningProgress: 0,
      sleepTimes: RoutineService.calculateSleepTimes(
        RoutineService.calculateMorningTimes("09:00")[0]?.time || "09:00",
      ), // Calculate initial sleep times

      completionHistory: {},

      // Actions
      toggleTask: (taskId, isEvening = false) =>
        set((state) => {
          if (isEvening) {
            const updatedEveningTasks = state.eveningTasks.map((task) =>
              task.id === taskId
                ? { ...task, completed: !task.completed }
                : task,
            );
            return {
              eveningTasks: updatedEveningTasks,
              eveningProgress:
                RoutineService.calculateProgress(updatedEveningTasks), // Calculate progress
            };
          }

          const updatedMorningTasks = state.morningTasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task,
          );
          return {
            morningTasks: updatedMorningTasks,
            morningProgress:
              RoutineService.calculateProgress(updatedMorningTasks), // Calculate progress
          };
        }),

      resetMorning: () =>
        set((state) => ({
          morningTasks: state.morningTasks.map((t) => ({
            ...t,
            completed: false,
          })),
          morningProgress: 0, // Reset progress
        })),

      resetEvening: () =>
        set((state) => ({
          eveningTasks: state.eveningTasks.map((t) => ({
            ...t,
            completed: false,
          })),
          eveningProgress: 0, // Reset progress
        })),

      updateFinishBy: (time) =>
        set(() => {
          const newMorningTasks = RoutineService.calculateMorningTimes(time);
          const firstTaskTime = newMorningTasks[0]?.time || time;

          return {
            finishBy: time,
            morningTasks: newMorningTasks,
            morningProgress: 0,
            sleepTimes: RoutineService.calculateSleepTimes(firstTaskTime), // Update sleep times
          };
        }),

      saveCompletion: () =>
        set((state) => {
          const today = new Date().toISOString().split("T")[0];
          return {
            completionHistory: {
              ...state.completionHistory,
              [today as string]: {
                morningProgress: state.morningProgress,
                eveningProgress: state.eveningProgress,
                morningTasks: [...state.morningTasks],
                eveningTasks: [...state.eveningTasks],
                completedAt: new Date().toISOString(),
              },
            },
          };
        }),
    }),
    {
      name: "routine-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist these fields
        finishBy: state.finishBy,
        morningTasks: state.morningTasks,
        eveningTasks: state.eveningTasks,
        morningProgress: state.morningProgress,
        eveningProgress: state.eveningProgress,
        sleepTimes: state.sleepTimes,
        completionHistory: state.completionHistory,
      }),
    },
  ),
);

export const useRoutineStore = routineStore;
