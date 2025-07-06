"use client";
import React from "react";
import { useRoutineStore } from "@repo/stores";
import { ProgressWithConfetti } from "@repo/ui/components/ui/progress-with-confetti";
import { Button } from "@repo/ui/components/ui/button";
import { SortableTaskList } from "@repo/ui/components/ui/sortable-task-list";
import { QuickTipsSection } from "~/components/QuickTipsSection";

export default function MorningRoutinePage() {
  const {
    finishBy,
    morningTasks,
    morningProgress,
    sleepTimes,
    toggleTask,
    resetMorning,
    updateFinishBy,
    reorderTasks,
  } = useRoutineStore();

  return (
    <div className="space-y-6">
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
      <SortableTaskList
        tasks={morningTasks}
        onToggle={toggleTask}
        onReorder={(taskIds) => reorderTasks(taskIds, false)}
      />
      <Button
        onClick={resetMorning}
        variant="destructive"
        className="w-full transition-all duration-200 hover:scale-105 hover:bg-red-700"
      >
        Reset Morning
      </Button>

      <QuickTipsSection />
    </div>
  );
}
