import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Genre } from "../types/type";
import { getRandomHexColor } from "../utils/random";

interface GenreComponentProps extends Genre {
  color1?: string;
  color2?: string;
  onPress?: () => void;
}

export default function GenreComponent({
  name,
  color1,
  color2,
  onPress,
}: GenreComponentProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={[color1 || getRandomHexColor(), color2 || getRandomHexColor()]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={styles.name}>{name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "48%",
    aspectRatio: 1.8,
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    padding: 16,
    justifyContent: "flex-end",
  },
  name: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
