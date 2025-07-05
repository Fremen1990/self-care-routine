import { RoutineTask, RoutineTip } from '@repo/types/routine';

export class RoutineService {
  static readonly MORNING_TASKS: Omit<RoutineTask, 'completed'>[] = [
    {
      id: 'wake-up',
      time: '',
      title: 'Wake up & Prep',
      description: 'Get dressed, hydrate, light warm-up',
      duration: 15,
      icon: '💤'
    },
    {
      id: 'run',
      time: '',
      title: 'Training Run',
      description: '1h daily',
      duration: 60,
      icon: '🏃'
    },
    {
      id: 'cold-shower',
      time: '',
      title: 'Cold shower',
      description: 'Cold shower for recovery',
      duration: 10,
      icon: '🚿'
    },
    {
      id: 'stretching',
      time: '',
      title: 'Stretching & rehab exercises',
      description: 'Shoulder, back and legs stretches',
      duration: 15,
      icon: '🤸'
    },
    {
      id: 'meditation',
      time: '',
      title: 'Meditation',
      description: 'Mindfulness before work',
      duration: 10,
      icon: '🧘'
    },
    {
      id: 'breakfast',
      time: '',
      title: 'Breakfast & Buffer',
      description: 'Prepare & eat breakfast, final prep for morning work meeting',
      duration: 30,
      icon: '🍳'
    }
  ];

  static readonly EVENING_TASKS: Omit<RoutineTask, 'completed'>[] = [
    {
      id: 'screens-off',
      time: '20:30',
      title: 'Screens Off',
      description: 'Turn off all screens, start wind-down',
      icon: '📵'
    },
    {
      id: 'evening-stretching',
      time: '20:30',
      title: 'Evening Stretching',
      description: 'Gentle stretches to release tension',
      duration: 15,
      icon: '🤸‍♀️'
    },
    {
      id: 'hot-shower',
      time: '20:45',
      title: 'Hot Shower',
      description: 'Warm shower to relax muscles',
      duration: 15,
      icon: '🛁'
    },
    {
      id: 'evening-meditation',
      time: '21:00',
      title: 'Evening Meditation',
      description: 'Calm the mind before sleep',
      duration: 10,
      icon: '🧘‍♀️'
    },
    {
      id: 'journaling',
      time: '21:10',
      title: 'Journaling',
      description: 'Reflect on the day, gratitude',
      duration: 10,
      icon: '📝'
    },
    {
      id: 'reading',
      time: '21:20',
      title: 'Reading in Bed',
      description: 'Read until naturally sleepy',
      icon: '📚'
    }
  ];

  static readonly ROUTINE_TIPS: RoutineTip[] = [
    {
      id: 'running',
      icon: '🏃‍♂️',
      title: 'Running',
      description: 'Stay hydrated, listen to your body, vary routes for motivation'
    },
    {
      id: 'cold-shower',
      icon: '🚿',
      title: 'Cold Shower',
      description: 'Reduces inflammation, boosts energy, start with 30 seconds'
    },
    {
      id: 'stretching',
      icon: '🤸',
      title: 'Stretching',
      description: 'Cross-body arm stretches, doorway chest stretches, hold 20-30s'
    },
    {
      id: 'meditation',
      icon: '🧘',
      title: 'Meditation',
      description: 'Morning: energizing breath work • Evening: body scan or loving-kindness'
    },
    {
      id: 'reading',
      icon: '📚',
      title: 'Reading',
      description: 'Choose calming genres, use dim warm light, stop when drowsy'
    },
    {
      id: 'sleep',
      icon: '💤',
      title: 'Sleep',
      description: 'Cool room (65-68°F), consistent times, no caffeine 6+ hours before bed'
    }
  ];

  static calculateMorningTimes(finishBy: string): RoutineTask[] {
    const [hours, minutes] = finishBy.split(':').map(Number);
    let totalMinutes = hours * 60 + minutes;
    const tasks: RoutineTask[] = [];

    // Work backwards from finish time
    for (let i = this.MORNING_TASKS.length - 1; i >= 0; i--) {
      const task = this.MORNING_TASKS[i];
      totalMinutes -= task.duration || 0;

      const taskHours = Math.floor(totalMinutes / 60);
      const taskMinutes = totalMinutes % 60;

      tasks.unshift({
        ...task,
        time: `${taskHours.toString().padStart(2, '0')}:${taskMinutes.toString().padStart(2, '0')}`,
        completed: false
      });
    }

    return tasks;
  }

  static calculateSleepTimes(wakeUpTime: string): { sevenHalf: string; eight: string } {
    const [hours, minutes] = wakeUpTime.split(':').map(Number);
    const wakeUpMinutes = hours * 60 + minutes;

    const sevenHalfMinutes = (wakeUpMinutes - 450 + 1440) % 1440;
    const eightMinutes = (wakeUpMinutes - 480 + 1440) % 1440;

    return {
      sevenHalf: `${Math.floor(sevenHalfMinutes / 60).toString().padStart(2, '0')}:${(sevenHalfMinutes % 60).toString().padStart(2, '0')}`,
      eight: `${Math.floor(eightMinutes / 60).toString().padStart(2, '0')}:${(eightMinutes % 60).toString().padStart(2, '0')}`
    };
  }

  static calculateProgress(tasks: RoutineTask[]): number {
    const completed = tasks.filter(t => t.completed).length;
    return Math.round((completed / tasks.length) * 100);
  }
}
