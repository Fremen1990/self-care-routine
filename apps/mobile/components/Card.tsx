// apps/mobile/components/Card.tsx
import React, { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";

interface CardProps {
  title: string;
  icon?: string;
  backgroundColor?: string;
  children: ReactNode;
  style?: any;
}

export const Card = ({
  title,
  icon = "",
  backgroundColor = "#f8fafc",
  children,
  style,
}: CardProps) => {
  return (
    <View style={[styles.card, { backgroundColor }, style]}>
      <Text style={styles.cardTitle}>{icon ? `${icon} ${title}` : title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
});
