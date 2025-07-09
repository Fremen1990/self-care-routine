import AsyncStorage from '@react-native-async-storage/async-storage';
import { createRoutineStore } from '@repo/stores';

export const useRoutineStore = createRoutineStore(AsyncStorage);
