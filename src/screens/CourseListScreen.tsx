import React from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Course } from "../models/Course";

export default function CourseListScreen({ route, navigation }) {
  const { player, courses } = route.params;

  function getRatingColor(rating: number) {
    if (rating >= 8) return "#4CAF50"; // grønn
    if (rating >= 5) return "#FFC107"; // gul
    return "#F44336"; // rød
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Baner</Text>

      <FlatList
        data={courses}
        keyExtractor={(item: Course) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("CourseScreen", {
                course: item,
                player,
              })
            }
          >
            {/* Bilde */}
            {item.images?.[0] && (
              <Image
                source={{ uri: item.images[0] }}
                style={styles.courseImage}
              />
            )}

            {/* Info */}
            <View style={styles.info}>
              <Text style={styles.courseName}>{item.name}</Text>

              <View style={styles.ratingRow}>
                <View
                  style={[
                    styles.userRatingBox,
                    { backgroundColor: getRatingColor(item.userRating) },
                  ]}
                >
                  <Text style={styles.userRatingText}>
                    {item.userRating.toFixed(1)}
                  </Text>
                </View>

                <Text style={styles.pprRating}>
                  PPR: {item.parPlayCourseRating}
                </Text>
              </View>

              <Text style={styles.layoutCount}>
                {item.layouts.length} layouts
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },

  courseImage: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },

  info: {
    padding: 12,
  },

  courseName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  userRatingBox: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 10,
  },

  userRatingText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  pprRating: {
    fontSize: 16,
    color: "#555",
  },

  layoutCount: {
    fontSize: 16,
    color: "#666",
  },
});
