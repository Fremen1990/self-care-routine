// apps/mobile/app/index.tsx - Pure React Native Version
import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  // Mock data
  const mockData = {
    morningProgress: 60,
    eveningProgress: 30,
    completedMorning: 3,
    totalMorning: 5,
    completedEvening: 2,
    totalEvening: 6,
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Self Care Routine</Text>
          <Text style={styles.subtitle}>
            Start your day with intention, end with reflection
          </Text>
        </View>

        {/* Progress Section */}
        <View style={styles.progressCard}>
          <Text style={styles.cardTitle}>📊 Today's Progress</Text>

          <View style={styles.progressItem}>
            <View style={styles.progressHeader}>
              <Text>Morning ({mockData.completedMorning}/{mockData.totalMorning})</Text>
              <Text style={styles.progressText}>{mockData.morningProgress}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${mockData.morningProgress}%`, backgroundColor: '#22c55e' }]} />
            </View>
          </View>

          <View style={styles.progressItem}>
            <View style={styles.progressHeader}>
              <Text>Evening ({mockData.completedEvening}/{mockData.totalEvening})</Text>
              <Text style={styles.progressText}>{mockData.eveningProgress}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${mockData.eveningProgress}%`, backgroundColor: '#a855f7' }]} />
            </View>
          </View>
        </View>

        {/* Routine Buttons */}
        <View style={styles.routineSection}>
          <TouchableOpacity
            style={[styles.routineButton, { backgroundColor: '#3b82f6' }]}
            onPress={() => router.push('/routine/morning')}
          >
            <Text style={styles.routineButtonText}>Morning Routine</Text>
            <Text style={styles.routineDescription}>Track your morning self-care routine</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.routineButton, { backgroundColor: '#a855f7' }]}
            onPress={() => router.push('/routine/evening')}
          >
            <Text style={styles.routineButtonText}>Evening Routine</Text>
            <Text style={styles.routineDescription}>Track your evening self-care routine</Text>
          </TouchableOpacity>
        </View>

        {/* Sleep Schedule */}
        <View style={[styles.progressCard, { backgroundColor: '#f3e8ff' }]}>
          <Text style={styles.cardTitle}>🌙 Sleep Schedule</Text>
          <Text style={styles.sleepText}>Target finish: 09:00</Text>
          <Text style={styles.sleepText}>Sleep by: 00:30 (7.5h) or 01:00 (8h)</Text>
        </View>

        {/* Quick Tips */}
        <View style={[styles.progressCard, { backgroundColor: '#dbeafe' }]}>
          <Text style={styles.cardTitle}>Quick Self-Care Tips</Text>
          <Text style={styles.tipText}>• Start your day with a glass of water</Text>
          <Text style={styles.tipText}>• Take short breaks during work</Text>
          <Text style={styles.tipText}>• Practice deep breathing when stressed</Text>
          <Text style={styles.tipText}>• Stretch regularly throughout the day</Text>
        </View>
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
    gap: 20,
  },
  header: {
    alignItems: 'center',
    gap: 8,
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  progressCard: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  progressItem: {
    gap: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
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
    borderRadius: 4,
  },
  routineSection: {
    gap: 12,
  },
  routineButton: {
    padding: 16,
    borderRadius: 12,
    gap: 4,
  },
  routineButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  routineDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  sleepText: {
    fontSize: 14,
    color: '#7c3aed',
  },
  tipText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
});
