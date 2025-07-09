import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useRoutineStore } from "../store/routine-store";
import { ProgressDisplay, Card } from "../components";

export default function Home() {
  const router = useRouter();
  const { morningTasks, eveningTasks } = useRoutineStore();

  // Calculate morning progress
  const completedMorningTasks =
    morningTasks?.filter((task) => task.completed)?.length || 0;

  const totalMorningTasks = morningTasks?.length || 0;
  const morningProgress =
    totalMorningTasks > 0
      ? (completedMorningTasks / totalMorningTasks) * 100
      : 0;

  // Calculate evening progress
  const completedEveningTasks =
    eveningTasks?.filter((task) => task.completed)?.length || 0;
  const totalEveningTasks = eveningTasks?.length || 0;
  const eveningProgress =
    totalEveningTasks > 0
      ? (completedEveningTasks / totalEveningTasks) * 100
      : 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Daily Self-Care Routine</Text>
          <Text style={styles.subtitle}>
            Start your day with intention, end with reflection
          </Text>
        </View>

        {/* Morning Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌞 Morning Routine</Text>
          <ProgressDisplay
            completedTasks={completedMorningTasks}
            totalTasks={totalMorningTasks}
            fillColor="#f97316" // Orange for morning
          />
          <TouchableOpacity
            style={styles.routineButton}
            onPress={() => router.push("/routine/morning")}
          >
            <Text style={styles.buttonText}>Go to Morning Routine</Text>
          </TouchableOpacity>
        </View>

        {/* Evening Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌙 Evening Routine</Text>
          <ProgressDisplay
            completedTasks={completedEveningTasks}
            totalTasks={totalEveningTasks}
            fillColor="#a855f7" // Purple for evening
          />
          <TouchableOpacity
            style={styles.routineButton}
            onPress={() => router.push("/routine/evening")}
          >
            <Text style={styles.buttonText}>Go to Evening Routine</Text>
          </TouchableOpacity>
        </View>

        {/* Sleep Schedule */}
        <Card title="Sleep Schedule" icon="🌙" backgroundColor="#f3e8ff">
          <Text style={styles.sleepText}>Target finish: 09:00</Text>
          <Text style={styles.sleepText}>
            Sleep by: 00:30 (7.5h) or 01:00 (8h)
          </Text>
        </Card>

        {/* Quick Tips */}
        <Card title="Quick Self-Care Tips" backgroundColor="#dbeafe">
          <Text style={styles.tipText}>
            • Start your day with a glass of water
          </Text>
          <Text style={styles.tipText}>• Take short breaks during work</Text>
          <Text style={styles.tipText}>
            • Practice deep breathing when stressed
          </Text>
          <Text style={styles.tipText}>
            • Stretch regularly throughout the day
          </Text>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
    gap: 20,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f3f4f6",
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 8,
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 10,
  },
  section: {
    gap: 12,
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  routineButton: {
    backgroundColor: "#3b82f6",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  sleepText: {
    fontSize: 14,
    color: "#4b5563",
  },
  tipText: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 4,
  },
});
