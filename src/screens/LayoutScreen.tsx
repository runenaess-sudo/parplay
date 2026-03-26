import React from "react";
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { createEmptyScorecard } from "../utils/createScorecard";

export default function LayoutScreen({ route, navigation }) {
  const { layout, course, player } = route.params;

  const totalHoles = layout.holes.length;

  return (
    <ScrollView style={styles.container}>

      {/* Layout title */}
      <View style={styles.header}>
        <Text style={styles.title}>{layout.name}</Text>
        <Text style={styles.subtitle}>
          {totalHoles} hull • Par {layout.par} • {layout.totalLength} m
        </Text>
      </View>

      {/* Hull-liste */}
      <Text style={styles.sectionTitle}>Hull</Text>

      <FlatList
        data={layout.holes}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.holeRow}>
            <Text style={styles.holeNumber}>Hull {item.number}</Text>
            <Text style={styles.holeInfo}>Par {item.par}</Text>
            <Text style={styles.holeInfo}>{item.length} m</Text>
          </View>
        )}
      />

      {/* Start runde */}
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

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 18,
    color: "#555",
    marginTop: 6,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },

  holeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  holeNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },

  holeInfo: {
    fontSize: 18,
    color: "#444",
  },

  startButton: {
    backgroundColor: "#4CAF50",
    padding: 18,
    borderRadius: 12,
    margin: 20,
  },

  startButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
