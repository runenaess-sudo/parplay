import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function HomeScreen({ route, navigation }) {
  const { player } = route.params;

  return (
    <View style={styles.container}>

      {/* Welcome */}
      <Text style={styles.welcome}>Hei, {player.name}</Text>

      {/* Rating */}
      <View style={styles.ratingBox}>
        <Text style={styles.ratingLabel}>Din ParPlay Rating</Text>
        <Text style={styles.ratingValue}>{player.parPlayRating.current}</Text>
        <Text style={styles.ratingChange}>
          Siste endring: {player.parPlayRating.lastChange >= 0 ? "+" : ""}
          {player.parPlayRating.lastChange}
        </Text>
      </View>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CourseListScreen", { player })}
      >
        <Text style={styles.buttonText}>Baner</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ProfileScreen", { player })}
      >
        <Text style={styles.buttonText}>Profil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("HistoryScreen", { player })}
      >
        <Text style={styles.buttonText}>Historikk</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.playButton}
        onPress={() => navigation.navigate("CourseListScreen", { player })}
      >
        <Text style={styles.playButtonText}>Spill runde</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },

  welcome: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  ratingBox: {
    backgroundColor: "#f2f2f2",
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },

  ratingLabel: {
    fontSize: 18,
    color: "#555",
  },

  ratingValue: {
    fontSize: 40,
    fontWeight: "bold",
    marginVertical: 6,
  },

  ratingChange: {
    fontSize: 16,
    color: "#777",
  },

  button: {
    backgroundColor: "#ddd",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },

  buttonText: {
    fontSize: 18,
    textAlign: "center",
  },

  playButton: {
    backgroundColor: "#4CAF50",
    padding: 18,
    borderRadius: 12,
    marginTop: 30,
  },

  playButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
