"use client";

import React from "react";
import { ProgressWithConfetti } from "@repo/ui/components/ui/progress-with-confetti";
import { Button } from "@repo/ui/components/ui/button";
import { SortableTaskList } from "@repo/ui/components/ui/sortable-task-list";
import { QuickTipsSection } from "~/components/QuickTipsSection";
import { useRoutineStore } from "~/store/routine-store";

export default function EveningRoutinePage() {
  const {
    eveningTasks,
    eveningProgress,
    toggleTask,
    resetEvening,
    reorderTasks,
  } = useRoutineStore();

  return (
    <div className="space-y-6">
      <ProgressWithConfetti
        value={eveningProgress}
        className="h-5 [&>div]:bg-green-600"
        withConfetti
      />
      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm">
          🌙 <strong>Wind-Down Schedule:</strong> Starts{" "}
          <strong>8:30 PM</strong> (screens off) • Reading{" "}
          <strong>9:20-10:00 PM</strong> • Sleep <strong>10:00-11:00 PM</strong>
        </p>
      </div>
      <SortableTaskList
        tasks={eveningTasks}
        onToggle={(id) => toggleTask(id, true)}
        onReorder={(taskIds) => reorderTasks(taskIds, true)}
      />
      <Button
        onClick={resetEvening}
        variant="destructive"
        className="w-full transition-all duration-200 hover:scale-105 hover:bg-red-700"
      >
        Reset Evening
      </Button>

      <QuickTipsSection />
    </div>
  );
}
