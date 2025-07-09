import React, { useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useRoutineStore } from "../../../store/routine-store";

import {
  ProgressDisplay,
  ProgressConfetti,
  RoutineHeader,
} from "../../../components";
import { RoutineTypes } from "../../../components/RoutineHeader";

export default function EveningRoutine() {
  const scrollViewRef = useRef(null);
  const scrollYRef = useRef(0);
  const { eveningTasks, toggleTask, resetEvening } = useRoutineStore();

  // Calculate progress
  const completedTasks =
    eveningTasks?.filter((task) => task.completed)?.length || 0;
  const totalTasks = eveningTasks?.length || 0;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollYRef.current = event.nativeEvent.contentOffset.y;
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <View style={styles.content}>
        {/* Header */}
        <RoutineHeader type={RoutineTypes.EVENING} />

        <ProgressDisplay
          completedTasks={completedTasks}
          totalTasks={totalTasks}
          fillColor="#22c55e"
        />

        {/* Sleep Reminder */}
        <View style={styles.sleepCard}>
          <Text style={styles.sleepTitle}>🌙 Sleep Reminder</Text>
          <Text style={styles.sleepText}>
            Aim to sleep by 01:30 for optimal rest
          </Text>
        </View>

        {/* Tasks */}
        <View style={styles.tasksSection}>
          {eveningTasks.map((task) => (
            <View
              key={task.id}
              style={[
                styles.taskCard,
                task.completed && styles.taskCardCompleted,
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
                  task.completed
                    ? styles.taskButtonCompleted
                    : styles.taskButtonPending,
                ]}
                onPress={() => toggleTask(task.id, true)}
              >
                <Text
                  style={[
                    styles.taskButtonText,
                    task.completed && styles.taskButtonTextCompleted,
                  ]}
                >
                  {task.completed ? "✓ Completed" : "Mark Complete"}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Reset Button */}
        <TouchableOpacity style={styles.resetButton} onPress={resetEvening}>
          <Text style={styles.resetButtonText}>Reset Evening</Text>
        </TouchableOpacity>

        <ProgressConfetti
          progress={progress}
          scrollY={scrollYRef.current}
          colors={["#a855f7", "#8b5cf6", "#d946ef", "#f472b6"]}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sleepCard: {
    backgroundColor: "#f3e8ff",
    padding: 12,
    borderRadius: 12,
    gap: 4,
  },
  sleepTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  sleepText: {
    fontSize: 12,
    color: "#7c3aed",
  },
  tasksSection: {
    gap: 12,
  },
  taskCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    gap: 12,
  },
  taskCardCompleted: {
    backgroundColor: "#f0fdf4",
    borderColor: "#22c55e",
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  taskTime: {
    fontSize: 12,
    color: "#6b7280",
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
    fontWeight: "600",
  },
  taskDescription: {
    fontSize: 14,
    color: "#6b7280",
  },
  taskDuration: {
    fontSize: 12,
    color: "#6b7280",
  },
  taskButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  taskButtonPending: {
    backgroundColor: "#a855f7",
  },
  taskButtonCompleted: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#22c55e",
  },
  taskButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  taskButtonTextCompleted: {
    color: "#22c55e",
  },
  resetButton: {
    backgroundColor: "#ef4444",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  resetButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
