import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TrackMenu from "./TrackMenu";
import { useTrackFavourites } from "../context/TrackFavouriteContext";
import { TopArtist } from "../types/type";
import { mapMinutesToHMM } from "../utils/mapDuration";
import { addTrack } from "../services/trackPlayerService";
import { Track } from "react-native-track-player";
import { mapToTrack } from "../utils/maptoTrack";

interface TrackComponentProps {
  id: number;
  title: string;
  artist: TopArtist;
  shortTitle: string;
  description: string;
  coverImageUrl: string;
  trackUrl: string;
  lyrics: string;
  trackRank: number;
  trackPreviewUrl: string;
  imageUrl?: string;
  duration: number;
  artistName?: string;
  onPress?: () => void;
  isInQueue?: boolean;
  onAddToQueue?: () => void;
  onRemoveFromQueue?: () => void;
  rightElement?: React.ReactNode;
}
export default function TrackComponent({
  id,
  title,
  artist,
  shortTitle,
  description,
  coverImageUrl,
  trackUrl,
  lyrics,
  trackRank,
  trackPreviewUrl,
  imageUrl,
  duration,
  onPress,
  artistName,
  isInQueue,
  onAddToQueue,
  onRemoveFromQueue,
  rightElement,
}: TrackComponentProps) {
  const { isFavourite, addToFavourites, removeFromFavourites } =
    useTrackFavourites();
  const [isFavorite1, setIsFavorite1] = useState(isFavourite(id));
  const handleAddToQueue = async (track: Track) => {
    await addTrack(track);
  };
  const track = {
    id: id,
    title,
    artist,
    shortTitle,
    description,
    coverImageUrl,
    trackUrl,
    lyrics,
    trackRank,
    trackPreviewUrl,
    duration: duration,
  };
  const handleToggleFavorite = () => {
    const flag = isFavourite(id);
    console.log(flag);
    setIsFavorite1(!flag);
    if (flag) {
      removeFromFavourites(id);
    } else {
      addToFavourites(track);
    }
    // TODO: Implement favorite functionality
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{
          uri:
            coverImageUrl ||
            "https://cdn-icons-png.freepik.com/512/651/651758.png",
        }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {artist.name}
        </Text>
      </View>
      <View style={styles.actions}>
        {duration && (
          <Text style={styles.duration}>
            {!isNaN(duration) && mapMinutesToHMM(duration)}
          </Text>
        )}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleToggleFavorite}
        >
          <Ionicons
            name={isFavourite(id) ? "heart" : "heart-outline"}
            size={24}
            color={isFavourite(id) ? "#ff4444" : "rgba(255,255,255,0.8)"}
          />
        </TouchableOpacity>
        {rightElement || (
          <TrackMenu
            isInQueue={isInQueue}
            isFavorite={isFavorite1}
            onAddToQueue={() => handleAddToQueue(mapToTrack(track))}
            onRemoveFromQueue={onRemoveFromQueue}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  artist: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  duration: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    marginRight: 12,
  },
  favoriteButton: {
    padding: 8,
    marginRight: 4,
  },
});
