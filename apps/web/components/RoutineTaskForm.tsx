import React, { useState, useEffect, FormEvent } from "react";
import type { RoutineTask } from "@repo/types";
import { useRoutineStore } from "~/store/routine-store";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { Textarea } from "@repo/ui/components/ui/textarea";

type RoutineTaskFormProps = {
  isEvening?: boolean;
  editTask?: RoutineTask | null;
  onFinishEdit?: () => void;
};

export function RoutineTaskForm({
  isEvening = false,
  editTask = null,
  onFinishEdit,
}: RoutineTaskFormProps) {
  const [title, setTitle] = useState(editTask?.title || "");
  const [description, setDescription] = useState(editTask?.description || "");
  const [time, setTime] = useState(editTask?.time || "");
  const [duration, setDuration] = useState(editTask?.duration || 0);
  const [icon, setIcon] = useState(editTask?.icon || "");

  const addTask = useRoutineStore((s) => s.addTask);
  const editTaskFn = useRoutineStore((s) => s.editTask);

  useEffect(() => {
    setTitle(editTask?.title || "");
    setDescription(editTask?.description || "");
    setTime(editTask?.time || "");
    setDuration(editTask?.duration || 0);
    setIcon(editTask?.icon || "");
  }, [editTask]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const taskData = {
      id: editTask ? editTask.id : Date.now().toString(),
      title,
      description,
      time,
      duration: Number(duration),
      icon,
      completed: editTask ? editTask.completed : false,
    };
    if (editTask) {
      editTaskFn(editTask.id, taskData, isEvening);
      onFinishEdit?.();
    } else {
      addTask(taskData, isEvening);
      onFinishEdit?.();
    }
    setTitle("");
    setDescription("");
    setTime("");
    setDuration(0);
    setIcon("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        rows={2}
      />
      <Input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        placeholder="Time"
      />
      <Input
        type="number"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
        placeholder="Duration (minutes)"
        min={0}
      />
      <Input
        value={icon}
        onChange={(e) => setIcon(e.target.value)}
        placeholder="Icon (e.g. 🏃‍♂️)"
      />
      <div className="flex gap-2">
        <Button type="submit" className="bg-green-600">
          {editTask ? "Update" : "Add"}
        </Button>
        {editTask && (
          <Button type="button" variant="secondary" onClick={onFinishEdit}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
type RoutineTaskListProps = {
  isEvening?: boolean;
  onEditTask: (task: RoutineTask) => void;
};

export function RoutineTaskList({
  isEvening = false,
  onEditTask,
}: RoutineTaskListProps) {
  const tasks = useRoutineStore((s) =>
    isEvening ? s.eveningTasks : s.morningTasks,
  );
  const deleteTask = useRoutineStore((s) => s.deleteTask);

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.title}
          <button onClick={() => onEditTask(task)}>✏️</button>
          <button onClick={() => deleteTask(task.id, isEvening)}>🗑️</button>
        </li>
      ))}
    </ul>
  );
}
