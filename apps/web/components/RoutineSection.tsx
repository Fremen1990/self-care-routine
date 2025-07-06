import React, { useState } from "react";
import { RoutineTaskForm, RoutineTaskList } from "~/components/RoutineTaskForm";
import type { RoutineTask } from "@repo/types";

export function RoutineSection({ isEvening = false }) {
  const [editingTask, setEditingTask] = useState<RoutineTask | null>(null);

  return (
    <section>
      <h2>{isEvening ? "Evening" : "Morning"} Routine</h2>
      <RoutineTaskForm
        isEvening={isEvening}
        editTask={editingTask}
        onFinishEdit={() => setEditingTask(null)}
      />
      <RoutineTaskList isEvening={isEvening} onEditTask={setEditingTask} />
    </section>
  );
}
