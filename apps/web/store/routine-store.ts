import { createRoutineStore } from "@repo/stores";

const noopStorage = {
  getItem: (_: string) => null,
  setItem: (_: string, __: string) => {},
  removeItem: (_: string) => {},
};

const storage =
  typeof window !== "undefined" ? window.localStorage : noopStorage;

export const useRoutineStore = createRoutineStore(storage);
