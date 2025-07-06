"use client";

import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import { Progress } from "@repo/ui/components/ui/progress";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";
import { Separator } from "@repo/ui/components/ui/separator";
import { useRoutine } from "@repo/hooks/use-routine";
import { RoutineTaskItem } from "@repo/ui/components/ui/routine-task-item";
import { RoutineTipCard } from "@repo/ui/components/ui/routine-tip-card";
import { RoutineService } from "@repo/services/routine-service";
import { ThemeToggle } from "@repo/ui/components/ui/theme-toggle";
import { ProgressWithConfetti } from "@repo/ui/components/ui/progress-with-confetti";

export default function RoutinePage() {
  const {
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
  } = useRoutine();

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Daily Routine Tracker</h1>
        <ThemeToggle />
      </div>

      <Tabs defaultValue="morning" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="morning"
            className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
          >
            ☀️ Morning Routine
          </TabsTrigger>
          <TabsTrigger
            value="evening"
            className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
          >
            🌙 Evening Routine
          </TabsTrigger>
        </TabsList>

        <TabsContent value="morning" className="space-y-6">
          <ProgressWithConfetti
            value={morningProgress}
            className="h-5 [&>div]:bg-green-600"
            withConfetti
          />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="font-semibold">Start Time:</label>
              <input
                type="time"
                value={finishBy}
                onChange={(e) => updateFinishBy(e.target.value)}
                className="px-3 py-1 border rounded"
              />
            </div>

            <div className="space-y-2 text-sm">
              <p>
                Finish by: <strong>{finishBy}</strong>
              </p>
              <p>
                💤 <strong>Sleep Schedule:</strong> For 8 hours sleep by{" "}
                <strong>{sleepTimes.eight}</strong> | For 7.5 hours sleep by{" "}
                <strong>{sleepTimes.sevenHalf}</strong>
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {morningTasks.map((task) => (
              <RoutineTaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
              />
            ))}
          </div>

          <Button
            onClick={resetMorning}
            variant="destructive"
            className="w-full transition-all duration-200 hover:scale-105 hover:bg-red-700"
          >
            Reset Morning
          </Button>
        </TabsContent>

        <TabsContent value="evening" className="space-y-6">
          <ProgressWithConfetti
            value={eveningProgress}
            className="h-5 [&>div]:bg-green-600"
            withConfetti
          />

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm">
              🌙 <strong>Wind-Down Schedule:</strong> Starts{" "}
              <strong>8:30 PM</strong> (screens off) • Reading{" "}
              <strong>9:20-10:00 PM</strong> • Sleep{" "}
              <strong>10:00-11:00 PM</strong>
            </p>
          </div>

          <div className="space-y-3">
            {eveningTasks.map((task) => (
              <RoutineTaskItem
                key={task.id}
                task={task}
                onToggle={(id) => toggleTask(id, true)}
              />
            ))}
          </div>

          <Button
            onClick={resetEvening}
            variant="destructive"
            className="w-full transition-all duration-200 hover:scale-105 hover:bg-red-700"
          >
            Reset Evening
          </Button>
        </TabsContent>
      </Tabs>

      <Separator className="my-8" />

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Quick Tips</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {RoutineService.ROUTINE_TIPS.map((tip) => (
            <RoutineTipCard key={tip.id} tip={tip} />
          ))}
        </div>
      </div>
    </div>
  );
}
