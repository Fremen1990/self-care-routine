import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress";
import { useRoutineStore } from "../store/routine-store";

interface ProgressDisplayProps {
  completedTasks: number;
  totalTasks: number;
  fillColor?: string;
  style?: any;
}

export const ProgressDisplay = ({
  completedTasks,
  totalTasks,
  fillColor = "#22c55e",
  style,
}: ProgressDisplayProps) => {
  const progressDecimal = totalTasks > 0 ? completedTasks / totalTasks : 0;
  const progressPercent = Math.round(progressDecimal * 100);

  return (
    <View style={[styles.progressCard, style]}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressLabel}>
          Progress ({completedTasks}/{totalTasks})
        </Text>
        {/*<Text style={styles.progressText}>{Math.round(progress)}%</Text>*/}
        <Text style={styles.progressText}>{progressPercent}%</Text>
      </View>
      <View style={styles.progressBar}>
        <Progress.Bar
          progress={progressDecimal}
          width={null} // Use full width
          height={8}
          borderRadius={4}
          color={fillColor}
          unfilledColor="#e5e7eb"
          borderWidth={0}
          animated={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderRadius: 4,
  },
});
