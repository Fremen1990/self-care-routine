import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { RoutineStore, RoutineTask } from "@repo/types";
import { RoutineService } from "@repo/services";

// Parametrize storage
export const createRoutineStore = (
  storage:
    | Storage
    | {
        getItem: (name: string) => Promise<string | null> | string | null;
        setItem: (name: string, value: string) => Promise<void> | void;
        removeItem: (name: string) => Promise<void> | void;
      },
) =>
  create<RoutineStore>()(
    persist(
      (set, get) => ({
        finishBy: "09:00",
        morningTasks: RoutineService.calculateMorningTimes("09:00"),
        eveningTasks: RoutineService.getEveningTasksWithCompletion(),
        morningProgress: 0,
        eveningProgress: 0,
        sleepTimes: RoutineService.calculateSleepTimes(
          RoutineService.calculateMorningTimes("09:00")[0]?.time || "09:00",
        ),
        completionHistory: {},
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
                  RoutineService.calculateProgress(updatedEveningTasks),
              };
            }
            const updatedMorningTasks = state.morningTasks.map((task) =>
              task.id === taskId
                ? { ...task, completed: !task.completed }
                : task,
            );
            return {
              morningTasks: updatedMorningTasks,
              morningProgress:
                RoutineService.calculateProgress(updatedMorningTasks),
            };
          }),
        addTask: (task: RoutineTask, isEvening = false) =>
          set((state) => {
            const key = isEvening ? "eveningTasks" : "morningTasks";
            return {
              [key]: [...state[key], task],
            };
          }),

        editTask: (
          taskId: string,
          updates: Partial<RoutineTask>,
          isEvening = false,
        ) =>
          set((state) => {
            const key = isEvening ? "eveningTasks" : "morningTasks";
            return {
              [key]: state[key].map((task) =>
                task.id === taskId ? { ...task, ...updates } : task,
              ),
            };
          }),

        deleteTask: (taskId: string, isEvening = false) =>
          set((state) => {
            const key = isEvening ? "eveningTasks" : "morningTasks";
            return {
              [key]: state[key].filter((task) => task.id !== taskId),
            };
          }),

        resetMorning: () =>
          set((state) => ({
            morningTasks: state.morningTasks.map((t) => ({
              ...t,
              completed: false,
            })),
            morningProgress: 0,
          })),
        resetEvening: () =>
          set((state) => ({
            eveningTasks: state.eveningTasks.map((t) => ({
              ...t,
              completed: false,
            })),
            eveningProgress: 0,
          })),
        updateFinishBy: (time) =>
          set(() => {
            const newMorningTasks = RoutineService.calculateMorningTimes(time);
            const firstTaskTime = newMorningTasks[0]?.time || time;
            return {
              finishBy: time,
              morningTasks: newMorningTasks,
              morningProgress: 0,
              sleepTimes: RoutineService.calculateSleepTimes(firstTaskTime),
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
        reorderTasks: (taskIds, isEvening = false) =>
          set((state) => {
            const taskList = isEvening
              ? state.eveningTasks
              : state.morningTasks;
            const reorderedTasks = taskIds.map(
              (id) => taskList.find((task: RoutineTask) => task.id === id)!,
            );
            return isEvening
              ? { eveningTasks: reorderedTasks }
              : { morningTasks: reorderedTasks };
          }),
      }),
      {
        name: "routine-storage",
        storage: createJSONStorage(() => storage),
        partialize: (state) => ({
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

// Usage example (web):
// export const useRoutineStore = createRoutineStore(localStorage);

// Usage example (React Native):
// import AsyncStorage from '@react-native-async-storage/async-storage';
// export const useRoutineStore = createRoutineStore(AsyncStorage);
