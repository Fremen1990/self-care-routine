import React from "react";
import { View, Text, StyleSheet } from "react-native";

export enum RoutineTypes {
  MORNING = "morning",
  EVENING = "evening",
}

interface RoutineHeaderProps {
  type: RoutineTypes;
  style?: any;
}

export const RoutineHeader = ({ type, style }: RoutineHeaderProps) => {
  const quotes = {
    morning: [
      "Start your day with intention",
      "Morning habits shape your day",
      "Rise and shine with purpose",
    ],
    evening: [
      "Wind down and reflect",
      "Close your day with gratitude",
      "Rest well, sleep better",
    ],
  };

  // Randomly select a quote
  const randomQuote =
    quotes[type][Math.floor(Math.random() * quotes[type].length)];

  const getIcon = () => (type === "morning" ? "🌞" : "🌙");
  const getTitle = () =>
    type === "morning" ? "Morning Routine" : "Evening Routine";
  const getColor = () => (type === "morning" ? "#f97316" : "#a855f7");

  return (
    <View style={[styles.container, style]}>
      <View style={styles.titleRow}>
        <Text style={styles.icon}>{getIcon()}</Text>
        <Text style={styles.title}>{getTitle()}</Text>
      </View>
      <Text style={[styles.quote, { color: getColor() }]}>{randomQuote}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  icon: {
    fontSize: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  quote: {
    fontSize: 16,
    fontStyle: "italic",
    marginTop: 4,
  },
});
