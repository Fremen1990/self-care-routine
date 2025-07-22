import AsyncStorage from '@react-native-async-storage/async-storage';
import { createRoutineStore } from './createRoutineStore';

export const useRoutineStore = createRoutineStore(AsyncStorage);
