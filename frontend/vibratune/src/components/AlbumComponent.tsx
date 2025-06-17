import { router } from "expo-router";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Genre, TopArtist, TopTrack } from "../types/type";

interface AlbumComponentProps {
  id: number;
  name: string;
  description?: string;
  releaseDate?: Date;
  bigCoverImageUrl?: string;
  smallCoverImageUrl?: string;
  mediumCoverImageUrl?: string;
  artist?: TopArtist;
  genre?: Genre;
  tracks?: TopTrack[];
  onPress?: () => void;
}

export default function AlbumComponent({
  id,
  name,
  mediumCoverImageUrl,
  artist,
  onPress,
}: AlbumComponentProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/(app)/(tabs)/home/detail-album?id=${id}`)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: mediumCoverImageUrl }} style={styles.image} />
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.artist} numberOfLines={1}>
        {artist?.name || "Artist name"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    marginRight: 15,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  artist: {
    color: "#9B9B9B",
    fontSize: 12,
  },
});
