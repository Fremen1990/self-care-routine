import React, { useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRoutineStore } from "../../../store/routine-store";
import {
  ProgressDisplay,
  ProgressConfetti,
  RoutineHeader,
} from "../../../components";
import { RoutineTypes } from "../../../components/RoutineHeader";

export default function MorningRoutine() {
  const scrollViewRef = useRef(null);
  const scrollYRef = useRef(0);
  const { morningTasks, toggleTask, resetMorning } = useRoutineStore();

  // Calculate progress
  const completedTasks =
    morningTasks?.filter((task) => task.completed)?.length || 0;
  const totalTasks = morningTasks?.length || 0;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const handleScroll = (event) => {
    scrollYRef.current = event.nativeEvent.contentOffset.y;
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      onScroll={handleScroll}
      scrollEventThrottle={16} // For smooth tracking
    >
      <View style={styles.content}>
        {/* Header */}
        <RoutineHeader type={RoutineTypes.MORNING} />

        <ProgressDisplay
          completedTasks={completedTasks}
          totalTasks={totalTasks}
          fillColor="#22c55e"
        />

        {/* Sleep Info */}
        <View style={styles.sleepCard}>
          <Text style={styles.sleepTitle}>💤 Sleep Schedule</Text>
          <Text style={styles.sleepText}>For 8 hours: Sleep by 01:00</Text>
          <Text style={styles.sleepText}>For 7.5 hours: Sleep by 01:30</Text>
        </View>

        {/* Tasks */}
        <View style={styles.tasksSection}>
          {morningTasks.map((task) => (
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
                onPress={() => toggleTask(task.id)}
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
        <TouchableOpacity style={styles.resetButton} onPress={resetMorning}>
          <Text style={styles.resetButtonText}>Reset Morning</Text>
        </TouchableOpacity>

        {/* Reusable confetti component */}
        <ProgressConfetti
          progress={progress}
          scrollY={scrollYRef.current}
          colors={["#22c55e", "#3b82f6", "#eab308", "#ef4444"]}
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
  scrollView: {
    flex: 1,
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
  progressCard: {
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#22c55e",
    borderRadius: 4,
  },
  progressItem: {
    gap: 8,
  },
  sleepCard: {
    backgroundColor: "#dbeafe",
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
    color: "#1e40af",
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
    backgroundColor: "#3b82f6",
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
