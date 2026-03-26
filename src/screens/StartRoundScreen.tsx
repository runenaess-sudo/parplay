import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Layout } from "../models/Layout";
import { createEmptyScorecard } from "../utils/createScorecard";

export default function StartRoundScreen({ route, navigation }) {
  const { course, player } = route.params;

  // Hvis banen har flere layouts, kan vi senere la brukeren velge.
  // For nå velger vi første layout automatisk.
  const layout: Layout = course.layouts[0];

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Start runde</Text>

      <Text style={styles.courseName}>{course.name}</Text>
      <Text style={styles.layoutName}>{layout.name}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Par: {layout.par}</Text>
        <Text style={styles.infoText}>Lengde: {layout.totalLength} m</Text>
        <Text style={styles.infoText}>Hull: {layout.holes.length}</Text>
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() =>
          navigation.navigate("ScorecardScreen", {
            player,
            layout,
            courseRating: course.parPlayCourseRating,
            initialScores: createEmptyScorecard(layout),
          })
        }
      >
        <Text style={styles.startButtonText}>Start runde</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  courseName: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 6,
  },

  layoutName: {
    fontSize: 20,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },

  infoBox: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
  },

  infoText: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 4,
  },

  startButton: {
    backgroundColor: "#4CAF50",
    padding: 18,
    borderRadius: 12,
  },

  startButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
