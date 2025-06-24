import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, RotateCcw, Sun, Moon, Circle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';


interface RoutineItem {
  id: string;
  activity: string;
  duration: number;
  time: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface SleepSchedule {
  bedtime8h: string;
  bedtime7h30: string;
  isNextDay: boolean;
}

interface RoutineCardProps {
  item: RoutineItem;
  isChecked: boolean;
  onToggle: (id: string, isEvening?: boolean) => void;
  isEvening?: boolean;
  darkMode: boolean;
}

interface CheckedItemsState {
  [key: string]: boolean;
}

// interface TipItem {
//   icon: string;
//   title: string;
//   tip: string;
//   color: string;
// }

const DailySelfCareRoutine = () => {
  const [startTime, setStartTime] = useState<string>('6:30');
  const [checkedItems, setCheckedItems] = useState<CheckedItemsState>({});
  const [eveningCheckedItems, setEveningCheckedItems] = useState<CheckedItemsState>({});
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const calculateTimeline = (start: string): RoutineItem[] => {
    const startDate = new Date(`2025-06-24 ${start}`);
    return [
      {
        id: 'prep',
        activity: 'Wake up & Prep',
        duration: 15,
        time: startDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        description: 'Get dressed, hydrate, light warm-up',
        icon: '🏃',
        color: 'from-blue-400 to-blue-600',
        bgColor: darkMode ? 'bg-slate-800/90 backdrop-blur-sm' : 'bg-gradient-to-br from-blue-50 to-blue-100',
        borderColor: darkMode ? 'border-blue-400/80' : 'border-blue-200'
      },
      {
        id: 'run',
        activity: 'Training Run',
        duration: 60,
        time: new Date(startDate.getTime() + 15*60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        description: '1-hour daily training run',
        icon: '🏃‍♂️',
        color: 'from-green-400 to-green-600',
        bgColor: darkMode ? 'bg-slate-800/90 backdrop-blur-sm' : 'bg-gradient-to-br from-green-50 to-green-100',
        borderColor: darkMode ? 'border-green-400/80' : 'border-green-200'
      },
      {
        id: 'shower',
        activity: 'Cold Shower',
        duration: 10,
        time: new Date(startDate.getTime() + 75*60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        description: 'Cold shower for recovery',
        icon: '🚿',
        color: 'from-cyan-400 to-cyan-600',
        bgColor: darkMode ? 'bg-slate-800/90 backdrop-blur-sm' : 'bg-gradient-to-br from-cyan-50 to-cyan-100',
        borderColor: darkMode ? 'border-cyan-400/80' : 'border-cyan-200'
      },
      {
        id: 'stretching',
        activity: 'Stretching & Rehab',
        duration: 10,
        time: new Date(startDate.getTime() + 85*60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        description: 'Elbow & shoulder rehab stretches',
        icon: '🤸',
        color: 'from-orange-400 to-orange-600',
        bgColor: darkMode ? 'bg-slate-800/90 backdrop-blur-sm' : 'bg-gradient-to-br from-orange-50 to-orange-100',
        borderColor: darkMode ? 'border-orange-400/80' : 'border-orange-200'
      },
      {
        id: 'meditation',
        activity: 'Meditation',
        duration: 15,
        time: new Date(startDate.getTime() + 95*60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        description: 'Mindfulness before work',
        icon: '🧘',
        color: 'from-purple-400 to-purple-600',
        bgColor: darkMode ? 'bg-slate-800/90 backdrop-blur-sm' : 'bg-gradient-to-br from-purple-50 to-purple-100',
        borderColor: darkMode ? 'border-purple-400/80' : 'border-purple-200'
      },
      {
        id: 'breakfast',
        activity: 'Breakfast & Buffer',
        duration: 20,
        time: new Date(startDate.getTime() + 110*60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        description: 'Prepare & eat breakfast, final prep for meeting',
        icon: '🍳',
        color: 'from-yellow-400 to-yellow-600',
        bgColor: darkMode ? 'bg-slate-800/90 backdrop-blur-sm' : 'bg-gradient-to-br from-yellow-50 to-yellow-100',
        borderColor: darkMode ? 'border-yellow-400/80' : 'border-yellow-200'
      }
    ];
  };

  const calculateEveningRoutine = (): RoutineItem[] => {
    const targetSleepTime = new Date(`2025-06-24 22:30`);
    return [
      {
        id: 'screens_off',
        activity: 'Screens Off',
        duration: 0,
        time: new Date(targetSleepTime.getTime() - 120*60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        description: 'Turn off all screens, start wind-down',
        icon: '📵',
        color: 'from-red-400 to-red-600',
        bgColor: darkMode ? 'bg-slate-800/90 backdrop-blur-sm' : 'bg-gradient-to-br from-red-50 to-red-100',
        borderColor: darkMode ? 'border-red-400/80' : 'border-red-200'
      },
      {
        id: 'evening_stretch',
        activity: 'Evening Stretching',
        duration: 15,
        time: new Date(targetSleepTime.getTime() - 120*60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        description: 'Gentle stretches to release tension',
        icon: '🤸‍♀️',
        color: 'from-orange-400 to-pink-500',
        bgColor: darkMode ? 'bg-slate-800/90 backdrop-blur-sm' : 'bg-gradient-to-br from-orange-50 to-pink-50',
        borderColor: darkMode ? 'border-orange-400/80' : 'border-orange-200'
      },
      {
        id: 'hot_shower',
        activity: 'Hot Shower',
        duration: 15,
        time: new Date(targetSleepTime.getTime() - 105*60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        description: 'Warm shower to relax muscles',
        icon: '🛁',
        color: 'from-pink-400 to-pink-600',
        bgColor: darkMode ? 'bg-slate-800/90 backdrop-blur-sm' : 'bg-gradient-to-br from-pink-50 to-pink-100',
        borderColor: darkMode ? 'border-pink-400/80' : 'border-pink-200'
      },
      {
        id: 'evening_meditation',
        activity: 'Evening Meditation',
        duration: 10,
        time: new Date(targetSleepTime.getTime() - 90*60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        description: 'Calm the mind before sleep',
        icon: '🧘‍♀️',
        color: 'from-purple-400 to-indigo-500',
        bgColor: darkMode ? 'bg-slate-800/90 backdrop-blur-sm' : 'bg-gradient-to-br from-purple-50 to-indigo-50',
        borderColor: darkMode ? 'border-purple-400/80' : 'border-purple-200'
      },
      {
        id: 'journaling',
        activity: 'Journaling',
        duration: 10,
        time: new Date(targetSleepTime.getTime() - 80*60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        description: 'Reflect on the day, gratitude',
        icon: '📝',
        color: 'from-blue-400 to-blue-600',
        bgColor: darkMode ? 'bg-slate-800/90 backdrop-blur-sm' : 'bg-gradient-to-br from-blue-50 to-blue-100',
        borderColor: darkMode ? 'border-blue-400/80' : 'border-blue-200'
      },
      {
        id: 'reading',
        activity: 'Reading in Bed',
        duration: 40,
        time: new Date(targetSleepTime.getTime() - 70*60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        description: 'Read until naturally sleepy',
        icon: '📚',
        color: 'from-green-400 to-teal-500',
        bgColor: darkMode ? 'bg-slate-800/90 backdrop-blur-sm' : 'bg-gradient-to-br from-green-50 to-teal-50',
        borderColor: darkMode ? 'border-green-400/80' : 'border-green-200'
      }
    ];
  };

  const [timeline, setTimeline] = useState<RoutineItem[]>(calculateTimeline(startTime));
  const finishTime: string = new Date(new Date(`2025-06-24 ${startTime}`).getTime() + 130 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const eveningRoutine: RoutineItem[] = calculateEveningRoutine();

  const calculateSleepSchedule = (wakeTime: string): SleepSchedule => {
    const wakeDate = new Date(`2025-06-24 ${wakeTime}`);
    const bedtime8h = new Date(wakeDate.getTime() - 8*60*60*1000);
    const bedtime7h30 = new Date(wakeDate.getTime() - 7.5*60*60*1000);
    
    return {
      bedtime8h: bedtime8h.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      bedtime7h30: bedtime7h30.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      isNextDay: bedtime8h.getDate() !== wakeDate.getDate()
    };
  };

  const sleepSchedule: SleepSchedule = calculateSleepSchedule(startTime);

  useEffect(() => {
    setTimeline(calculateTimeline(startTime));
  }, [startTime, darkMode]);

  const toggleCheck = (id: string, isEvening: boolean = false): void => {
    if (isEvening) {
      setEveningCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
    } else {
      setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
    }
  };

  const resetRoutine = (isEvening: boolean = false): void => {
    if (isEvening) {
      setEveningCheckedItems({});
    } else {
      setCheckedItems({});
    }
  };

  const getProgress = (items: Record<string, boolean>, total: number): number => {
    const completed = Object.values(items).filter(Boolean).length;
    return (completed / total) * 100;
  };

  const morningProgress = getProgress(checkedItems, timeline.length);
  const eveningProgress = getProgress(eveningCheckedItems, eveningRoutine.length);

  const RoutineCard: React.FC<RoutineCardProps> = ({ item, isChecked, onToggle, isEvening = false }:RoutineCardProps) => {
    const checkboxClasses = `w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 ${
      isChecked 
        ? 'bg-gradient-to-r from-green-400 to-green-500 border-green-300 shadow-lg' 
        : darkMode 
          ? 'bg-slate-600/80 border-slate-400/80 hover:border-slate-300 shadow-lg' 
          : 'bg-white border-gray-300 hover:border-gray-400 shadow-md'
    }`;

    const cardClasses = `transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${item.bgColor} ${item.borderColor} border-2 ${
      isChecked ? 'ring-4 ring-green-400 ring-opacity-50 shadow-lg' : 'shadow-md'
    }`;

    return (
      <Card className={cardClasses}>
        <CardContent className="p-6 flex items-center justify-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <div 
                onClick={() => onToggle(item.id, isEvening)}
                className={checkboxClasses}
              >
                {isChecked ? (
                  <CheckCircle className="w-6 h-6 text-white" />
                ) : (
                  <Circle className={`w-6 h-6 ${darkMode ? 'text-slate-200' : 'text-gray-400'}`} />
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-3xl drop-shadow-sm">{item.icon}</span>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <Clock className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    <Badge className={`bg-gradient-to-r ${item.color} text-white shadow-md`}>
                      {item.time}
                    </Badge>
                    <span className={`font-bold text-lg ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{item.activity}</span>
                  </div>
                  <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
                </div>
              </div>
            </div>
            
            {item.duration > 0 && (
              <Badge variant="outline" className="text-sm font-semibold px-3 py-1">
                {item.duration} min
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  console.log("Morning Progress:", morningProgress);

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50'
    }`}>
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        <Card className={`shadow-2xl ${
          darkMode 
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
        }`}>
          <CardHeader className="text-center relative">
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
                className="text-white hover:bg-white/20 transition-all duration-300"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
            <CardTitle className="text-4xl font-bold mb-2">Daily Self-Care Routines</CardTitle>
            <p className={`text-lg ${darkMode ? 'text-blue-200' : 'text-blue-100'}`}>
              Your personalized morning and evening wellness schedule
            </p>
          </CardHeader>
        </Card>

        <Tabs defaultValue="morning" className="w-full">
          <TabsList className={`grid w-full grid-cols-2 h-14 shadow-lg rounded-xl ${
            darkMode ? 'bg-slate-800/80 backdrop-blur-sm' : 'bg-white'
          }`}>
            <TabsTrigger 
              value="morning" 
              className={`flex items-center gap-3 text-lg font-semibold rounded-lg transition-all duration-300 ${
                darkMode 
                  ? 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white text-gray-200 hover:text-white' 
                  : 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-400 data-[state=active]:to-yellow-500 data-[state=active]:text-white'
              }`}
            >
              <Sun className="w-5 h-5" />
              Morning Routine
            </TabsTrigger>
            <TabsTrigger 
              value="evening" 
              className={`flex items-center gap-3 text-lg font-semibold rounded-lg transition-all duration-300 ${
                darkMode 
                  ? 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white text-gray-200 hover:text-white' 
                  : 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white'
              }`}
            >
              <Moon className="w-5 h-5" />
              Evening Routine
            </TabsTrigger>
          </TabsList>

          <TabsContent value="morning" className="space-y-6">
            <Card className={`border-2 shadow-lg ${
              darkMode 
                ? 'bg-slate-800/90 border-orange-400/60 backdrop-blur-sm' 
                : 'bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200'
            }`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className={`text-2xl ${darkMode ? 'text-orange-300' : 'text-orange-800'}`}>
                    Morning Progress
                  </CardTitle>
                  <Badge className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white text-lg px-4 py-2">
                    {Object.values(checkedItems).filter(Boolean).length}/{timeline.length}
                  </Badge>
                </div>
                <Progress value={isNaN(morningProgress) ? 0 : morningProgress} className={`w-full h-3 ${darkMode ? 'bg-orange-900/50' : 'bg-orange-100'}`} />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`flex items-center gap-4 p-4 rounded-lg shadow-sm ${
                  darkMode ? 'bg-slate-700/80 backdrop-blur-sm border border-slate-600/50' : 'bg-white'
                }`}>
                  <label className={`text-sm font-bold ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                    Start Time:
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className={`border-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all focus:ring-2 ${
                      darkMode 
                        ? 'border-orange-400/60 bg-slate-600/80 text-orange-100 focus:border-orange-300 focus:ring-orange-400/30 backdrop-blur-sm' 
                        : 'border-orange-200 focus:border-orange-400 focus:ring-orange-200'
                    }`}
                  />
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                    Finish by: <strong className={darkMode ? 'text-orange-300' : 'text-orange-600'}>{finishTime}</strong>
                  </span>
                </div>
                
                <Alert className={`border-2 ${
                  darkMode 
                    ? 'bg-slate-800/90 border-indigo-400/60 backdrop-blur-sm' 
                    : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200'
                }`}>
                  <AlertDescription className={`font-medium ${darkMode ? 'text-indigo-200' : 'text-indigo-800'}`}>
                    <strong>💤 Sleep Schedule:</strong> For 8 hours sleep by{' '}
                    <span className={`font-bold ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>
                      {sleepSchedule.bedtime8h}
                    </span>{' '}
                    | For 7.5 hours sleep by{' '}
                    <span className={`font-bold ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>
                      {sleepSchedule.bedtime7h30}
                    </span>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <div className="space-y-5">
              {timeline.map((item) => (
                <RoutineCard
                  key={item.id}
                  item={item}
                  isChecked={checkedItems[item.id]}
                  onToggle={toggleCheck}
                  darkMode={darkMode}
                />
              ))}
            </div>

            <div className="flex justify-center">
              <Button 
                variant="outline" 
                onClick={() => resetRoutine(false)}
                className={`font-semibold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  darkMode 
                    ? 'bg-slate-700/80 hover:bg-slate-600/80 border-orange-400/60 text-orange-200 backdrop-blur-sm' 
                    : 'bg-white hover:bg-orange-50 border-2 border-orange-200 text-orange-700'
                }`}
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset Morning
              </Button>
            </div>

            {morningProgress === 100 && (
              <Alert className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 shadow-xl">
                <AlertDescription className="text-white font-bold text-lg text-center">
                  🎉 Amazing work! You've completed your entire morning routine. Ready to crush your 9am meeting!
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>

          <TabsContent value="evening" className="space-y-6">
            <Card className={`border-2 shadow-lg ${
              darkMode 
                ? 'bg-slate-800/90 border-purple-400/60 backdrop-blur-sm' 
                : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'
            }`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className={`text-2xl ${darkMode ? 'text-purple-300' : 'text-purple-800'}`}>
                    Evening Progress
                  </CardTitle>
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg px-4 py-2">
                    {Object.values(eveningCheckedItems).filter(Boolean).length}/{eveningRoutine.length}
                  </Badge>
                </div>
                <Progress value={eveningProgress} className={`w-full h-3 ${darkMode ? 'bg-purple-900/50' : 'bg-purple-100'}`} />
              </CardHeader>
              <CardContent>
                <Alert className={`border-2 ${
                  darkMode 
                    ? 'bg-slate-800/90 border-purple-400/60 backdrop-blur-sm' 
                    : 'bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200'
                }`}>
                  <AlertDescription className={`font-medium ${darkMode ? 'text-purple-200' : 'text-purple-800'}`}>
                    <strong>🌙 Wind-Down Schedule:</strong> Starts{' '}
                    <span className={`font-bold ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>8:30 PM</span> (screens off) •{' '}
                    Reading{' '}
                    <span className={`font-bold ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>9:20-10:00 PM</span> •{' '}
                    Sleep{' '}
                    <span className={`font-bold ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>10:00-11:00 PM</span>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <div className="space-y-5">
              {eveningRoutine.map((item) => (
                <RoutineCard
                  key={item.id}
                  item={item}
                  isChecked={eveningCheckedItems[item.id]}
                  onToggle={toggleCheck}
                  isEvening={true}
                  darkMode={darkMode}
                />
              ))}
            </div>

            <div className="flex justify-center">
              <Button 
                variant="outline" 
                onClick={() => resetRoutine(true)}
                className={`font-semibold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  darkMode 
                    ? 'bg-slate-700/80 hover:bg-slate-600/80 border-purple-400/60 text-purple-200 backdrop-blur-sm' 
                    : 'bg-white hover:bg-purple-50 border-2 border-purple-200 text-purple-700'
                }`}
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset Evening
              </Button>
            </div>

            {eveningProgress === 100 && (
              <Alert className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-xl">
                <AlertDescription className="text-white font-bold text-lg text-center">
                  🌙 Perfect! You've completed your evening wind-down. Sweet dreams and great recovery!
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>

        <Card className={`shadow-xl border-0 ${darkMode ? 'bg-slate-800/80 backdrop-blur-sm' : 'bg-white'}`}>
          <CardHeader>
            <CardTitle className={`text-2xl ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Quick Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: '🏃‍♂️', title: 'Running', tip: 'Stay hydrated, listen to your body, vary routes for motivation', color: 'from-green-400 to-green-600' },
                { icon: '🚿', title: 'Cold Shower', tip: 'Reduces inflammation, boosts energy, start with 30 seconds', color: 'from-cyan-400 to-cyan-600' },
                { icon: '🤸', title: 'Stretching', tip: 'Cross-body arm stretches, doorway chest stretches, hold 20-30s', color: 'from-orange-400 to-orange-600' },
                { icon: '🧘', title: 'Meditation', tip: 'Morning: energizing breath work • Evening: body scan or loving-kindness', color: 'from-purple-400 to-purple-600' },
                { icon: '📚', title: 'Reading', tip: 'Choose calming genres, use dim warm light, stop when drowsy', color: 'from-blue-400 to-blue-600' },
                { icon: '💤', title: 'Sleep', tip: 'Cool room (65-68°F), consistent times, no caffeine 6+ hours before bed', color: 'from-indigo-400 to-indigo-600' }
              ].map((item, index) => (
                <Alert key={index} className={`border-2 shadow-md hover:shadow-lg transition-all duration-300 ${
                  darkMode 
                    ? 'bg-slate-700/80 border-slate-600/60 backdrop-blur-sm' 
                    : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'
                }`}>
                  <AlertDescription>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <strong className={`bg-gradient-to-r ${item.color} bg-clip-text text-transparent font-bold`}>
                          {item.title}:
                        </strong>
                        <span className={`ml-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{item.tip}</span>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DailySelfCareRoutine;