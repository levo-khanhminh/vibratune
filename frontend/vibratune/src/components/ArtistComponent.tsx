import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface ArtistComponentProps {
  name: string;
  bigPictureUrl?: string;
  mediumPictureUrl: string;
  smallPictureUrl: string;
  onPress?: () => void;
}

export default function ArtistComponent({
  name,
  onPress,
  mediumPictureUrl,
}: ArtistComponentProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: mediumPictureUrl }} style={styles.image} />
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: 80,
    marginRight: 15,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  name: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
});
