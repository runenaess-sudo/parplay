import React from "react";
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Layout } from "../models/Layout";

export default function CourseScreen({ route, navigation }) {
  const { course, player } = route.params;

  const mainImage = course.images?.[0];

  function getRatingColor(rating: number) {
    if (rating >= 8) return "#4CAF50"; // grønn
    if (rating >= 5) return "#FFC107"; // gul
    return "#F44336"; // rød
  }

  return (
    <ScrollView style={styles.container}>

      {/* Hero image */}
      {mainImage && (
        <Image source={{ uri: mainImage }} style={styles.heroImage} />
      )}

      {/* Title + ratings */}
      <View style={styles.header}>
        <Text style={styles.title}>{course.name}</Text>

        <View style={styles.ratingRow}>
          <View
            style={[
              styles.userRatingBox,
              { backgroundColor: getRatingColor(course.userRating) },
            ]}
          >
            <Text style={styles.userRatingText}>{course.userRating.toFixed(1)}</Text>
          </View>

          <Text style={styles.pprRating}>
            PPR Course Rating: {course.parPlayCourseRating}
          </Text>
        </View>
      </View>

      {/* Description */}
      {course.description && (
        <Text style={styles.description}>{course.description}</Text>
      )}

      {/* Location */}
      <Text style={styles.location}>
        📍 {course.latitude.toFixed(5)}, {course.longitude.toFixed(5)}
      </Text>

      {/* Images */}
      <Text style={styles.sectionTitle}>Bilder</Text>
      <FlatList
        data={course.images}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(uri) => uri}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.galleryImage} />
        )}
      />

      {/* Layouts */}
      <Text style={styles.sectionTitle}>Layouts</Text>
      {course.layouts.map((layout: Layout) => (
        <TouchableOpacity
          key={layout.id}
          style={styles.layoutCard}
          onPress={() =>
            navigation.navigate("LayoutScreen", {
              layout,
              course,
              player,
            })
          }
        >
          <Text style={styles.layoutName}>{layout.name}</Text>
          <Text style={styles.layoutInfo}>
            Par {layout.par} • {layout.totalLength} m
          </Text>
        </TouchableOpacity>
      ))}

      {/* Start round */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={() =>
          navigation.navigate("StartRoundScreen", {
            course,
            player,
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

  heroImage: {
    width: "100%",
    height: 220,
    resizeMode: "cover",
  },

  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  userRatingBox: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 12,
  },

  userRatingText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  pprRating: {
    fontSize: 16,
    color: "#555",
  },

  description: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    fontSize: 16,
    color: "#444",
  },

  location: {
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },

  galleryImage: {
    width: 140,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 16,
  },

  layoutCard: {
    backgroundColor: "#f2f2f2",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 10,
  },

  layoutName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  layoutInfo: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
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
