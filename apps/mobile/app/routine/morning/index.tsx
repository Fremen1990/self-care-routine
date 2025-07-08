// apps/mobile/app/routine/morning/index.tsx - Pure React Native
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface SimpleTask {
  id: string;
  time: string;
  title: string;
  description: string;
  duration: number;
  icon: string;
  completed: boolean;
}

export default function MorningRoutine() {
  const [tasks, setTasks] = useState<SimpleTask[]>([
    {
      id: "1",
      time: "06:30",
      title: "Wake up & Prep",
      description: "Get dressed, hydrate, light warm-up",
      duration: 15,
      icon: "💤",
      completed: false,
    },
    {
      id: "2",
      time: "06:45",
      title: "Training Run",
      description: "1h daily",
      duration: 60,
      icon: "🏃",
      completed: true,
    },
    {
      id: "3",
      time: "07:45",
      title: "Cold shower",
      description: "Cold shower for recovery",
      duration: 10,
      icon: "🚿",
      completed: false,
    },
    {
      id: "4",
      time: "07:55",
      title: "Meditation",
      description: "Mindfulness before work",
      duration: 10,
      icon: "🧘",
      completed: false,
    },
    {
      id: "5",
      time: "08:05",
      title: "Breakfast",
      description: "Prepare & eat breakfast",
      duration: 30,
      icon: "🍳",
      completed: false,
    },
  ]);

  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = (completedTasks / tasks.length) * 100;

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const resetTasks = () => {
    setTasks(tasks.map(task => ({ ...task, completed: false })));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <Text style={styles.title}>Morning Routine</Text>

        {/* Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Progress</Text>
            <Text style={styles.progressText}>{Math.round(progress)}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>

        {/* Sleep Info */}
        <View style={styles.sleepCard}>
          <Text style={styles.sleepTitle}>💤 Sleep Schedule</Text>
          <Text style={styles.sleepText}>For 8 hours: Sleep by 01:00</Text>
          <Text style={styles.sleepText}>For 7.5 hours: Sleep by 01:30</Text>
        </View>

        {/* Tasks */}
        <View style={styles.tasksSection}>
          {tasks.map((task) => (
            <View
              key={task.id}
              style={[
                styles.taskCard,
                task.completed && styles.taskCardCompleted
              ]}
            >
              <View style={styles.taskHeader}>
                <Text style={styles.taskTime}>{task.time}</Text>
                <Text style={styles.taskIcon}>{task.icon}</Text>
                <View style={styles.taskInfo}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskDescription}>{task.description}</Text>
                </View>
                <Text style={styles.taskDuration}>{task.duration}m</Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.taskButton,
                  task.completed ? styles.taskButtonCompleted : styles.taskButtonPending
                ]}
                onPress={() => toggleTask(task.id)}
              >
                <Text style={[
                  styles.taskButtonText,
                  task.completed && styles.taskButtonTextCompleted
                ]}>
                  {task.completed ? "✓ Completed" : "Mark Complete"}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Reset Button */}
        <TouchableOpacity style={styles.resetButton} onPress={resetTasks}>
          <Text style={styles.resetButtonText}>Reset Morning</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressCard: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 4,
  },
  sleepCard: {
    backgroundColor: '#dbeafe',
    padding: 12,
    borderRadius: 12,
    gap: 4,
  },
  sleepTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  sleepText: {
    fontSize: 12,
    color: '#1e40af',
  },
  tasksSection: {
    gap: 12,
  },
  taskCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 12,
  },
  taskCardCompleted: {
    backgroundColor: '#f0fdf4',
    borderColor: '#22c55e',
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  taskTime: {
    fontSize: 12,
    color: '#6b7280',
    minWidth: 40,
  },
  taskIcon: {
    fontSize: 20,
  },
  taskInfo: {
    flex: 1,
    gap: 4,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  taskDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  taskDuration: {
    fontSize: 12,
    color: '#6b7280',
  },
  taskButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  taskButtonPending: {
    backgroundColor: '#3b82f6',
  },
  taskButtonCompleted: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  taskButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  taskButtonTextCompleted: {
    color: '#22c55e',
  },
  resetButton: {
    backgroundColor: '#ef4444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
