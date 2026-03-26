import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

import { ScoreEntry } from "../models/ScoreEntry";
import { Layout } from "../models/Layout";
import { updateScore } from "../utils/updateScore";
import { calculateTotals } from "../utils/calcTotals";
import { finishRoundAndUpdatePlayer } from "../services/roundService";

export default function ScorecardScreen({ route, navigation }) {
  const { player, layout, courseRating } = route.params;

  // Generert scorekort kommer fra route.params.initialScores
  const [scores, setScores] = useState<ScoreEntry[]>(route.params.initialScores);

  const totals = calculateTotals(scores);

  function changeScore(holeNumber: number, delta: number) {
    const current = scores.find(s => s.holeNumber === holeNumber)?.score ?? 0;
    const newScore = Math.max(0, current + delta);
    setScores(updateScore(scores, holeNumber, newScore));
  }

  function finishRound() {
    const result = finishRoundAndUpdatePlayer(
      player,
      layout.courseId,
      layout.id,
      courseRating,
      scores
    );

    navigation.navigate("RoundResultScreen", {
      round: result.round,
      updatedPlayer: result.updatedPlayer,
    });
  }

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{layout.name}</Text>
        <Text style={styles.score}>
          {totals.totalScore} ({totals.relativeToPar >= 0 ? "+" : ""}{totals.relativeToPar})
        </Text>
      </View>

      {/* Hull-liste */}
      <FlatList
        data={scores}
        keyExtractor={(item) => item.holeId}
        renderItem={({ item }) => (
          <View style={styles.holeRow}>
            <Text style={styles.holeNumber}>Hull {item.holeNumber}</Text>
            <Text style={styles.par}>Par {item.par}</Text>

            <View style={styles.scoreControls}>
              <TouchableOpacity onPress={() => changeScore(item.holeNumber, -1)} style={styles.button}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>

              <Text style={styles.scoreValue}>{item.score}</Text>

              <TouchableOpacity onPress={() => changeScore(item.holeNumber, +1)} style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>

            <Text
              style={[
                styles.diff,
                item.difference < 0 ? styles.birdie :
                item.difference > 0 ? styles.bogey :
                styles.parColor
              ]}
            >
              {item.difference >= 0 ? "+" : ""}{item.difference}
            </Text>
          </View>
        )}
      />

      {/* Fullfør runde */}
      <TouchableOpacity style={styles.finishButton} onPress={finishRound}>
        <Text style={styles.finishText}>Fullfør runde</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f8f8f8" },

  header: { marginBottom: 20, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
  score: { fontSize: 20, marginTop: 4 },

  holeRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },

  holeNumber: { flex: 1, fontSize: 16