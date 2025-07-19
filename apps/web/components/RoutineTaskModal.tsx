"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { Button } from "@repo/ui/components/ui/button";
import { RoutineTaskForm } from "~/components/RoutineTaskForm";
import { useState, useEffect } from "react";
import type { RoutineTask } from "@repo/types";

type RoutineTaskModalProps = {
  editTask?: RoutineTask | null;
  onFinishEdit?: () => void;
  isEvening?: boolean;
};

export function RoutineTaskModal({
  editTask = null,
  onFinishEdit,
  isEvening,
}: RoutineTaskModalProps) {
  const [open, setOpen] = useState(false);

  // Sync open state with editTask
  useEffect(() => {
    if (editTask) setOpen(true);
  }, [editTask]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="w-full bg-green-600 hover:bg-green-700 transition-all duration-200"
        >
          {editTask ? "Edit Task" : "Add New Routine"}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-2xl max-w-md w-full">
        <DialogTitle>{editTask ? "Edit Task" : "Add New Routine"}</DialogTitle>
        <RoutineTaskForm
          isEvening={isEvening}
          editTask={editTask}
          onFinishEdit={() => {
            setOpen(false);
            onFinishEdit?.();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
