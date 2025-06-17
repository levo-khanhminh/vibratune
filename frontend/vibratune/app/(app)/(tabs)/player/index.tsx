import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Screen from "../../../../src/components/Screen";
import TrackPlayer, {
  useProgress,
  State,
  usePlaybackState,
} from "react-native-track-player";
import { TouchableWithoutFeedback } from "react-native";

const { width } = Dimensions.get("window");

export default function NowPlayingScreen() {
  const router = useRouter();
  const [trackTitle, setTrackTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [artwork, setArtwork] = useState("");

  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false);

  // Get playback position and duration
  const { position, duration } = useProgress(250); // updates every 250ms
  const playbackState = usePlaybackState();

  // Format seconds into MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Load current track info
  async function loadCurrentTrack() {
    const currentTrackId = await TrackPlayer.getCurrentTrack();
    if (currentTrackId !== null) {
      const track = await TrackPlayer.getTrack(currentTrackId);
      setTrackTitle(track?.title || "Unknown");
      setArtistName(track?.artist || "Unknown Artist");
      setArtwork(track?.artwork || "");
    }
  }

  // Toggle play/pause
  const handlePlayPause = async () => {
    if (isPlayingRef.current) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }

    const newState = !isPlayingRef.current;
    isPlayingRef.current = newState;
    setIsPlaying(newState);
  };

  // Skip handlers
  async function handleSkipToNext() {
    await TrackPlayer.skipToNext();
    loadCurrentTrack(); // update UI
  }

  async function handleSkipToPrevious() {
    await TrackPlayer.skipToPrevious();
    loadCurrentTrack(); // update UI
  }
  const handleSeek = async (value: any) => {
    await TrackPlayer.seekTo(value);
  };

  // Update track info when mounted or playback state changes
  useEffect(() => {
    loadCurrentTrack();
  }, [playbackState]);

  return (
    <Screen>
      <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
      <SafeAreaView style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-down" size={32} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Now Playing</Text>
          <TouchableOpacity
            style={styles.queueButton}
            onPress={() => router.push("(app)/(tabs)/player/queue")}
          >
            <Ionicons name="list" size={28} color="#fff" />
            <View style={styles.queueCount}>
              <Text style={styles.queueCountText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ARTWORK */}
        <View style={styles.artworkContainer}>
          <Image
            source={
              artwork
                ? { uri: artwork }
                : require("../../../../assets/images/artist_taylor_swift.png")
            }
            style={styles.artwork}
          />
          <BlurView intensity={60} tint="dark" style={styles.artworkOverlay}>
            <View style={styles.playingIndicator}>
              <View style={[styles.bar, styles.bar1]} />
              <View style={[styles.bar, styles.bar2]} />
              <View style={[styles.bar, styles.bar3]} />
            </View>
          </BlurView>
        </View>
        {/* TRACK INFO */}
        <View style={styles.trackInfo}>
          <Text style={styles.trackTitle} numberOfLines={1}>
            {trackTitle}
          </Text>
          <Text style={styles.artistName} numberOfLines={1}>
            {artistName}
          </Text>
        </View>

        {/* PROGRESS BAR */}
        <View style={styles.progressContainer}>
          <TouchableWithoutFeedback
            onPress={(event: any) => {
              const touchX = event.nativeEvent.locationX;
              const progressBarWidth = width - 40; // or use a ref to get actual width
              const seekPosition = (touchX / progressBarWidth) * duration;
              handleSeek(seekPosition);
            }}
          >
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progress,
                  { width: `${(position / duration) * 100 || 0}%` },
                ]}
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(position)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>

        {/* CONTROLS */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="shuffle" size={24} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleSkipToPrevious}
          >
            <Ionicons name="play-skip-back" size={32} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={32}
              color="#000"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleSkipToNext}
          >
            <Ionicons name="play-skip-forward" size={32} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="repeat" size={24} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },
  headerTitle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  queueButton: {
    position: "relative",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  queueCount: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#9FE870",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  queueCountText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "600",
  },
  artworkContainer: {
    width: width - 80,
    aspectRatio: 1,
    alignSelf: "center",
    marginTop: 40,
    borderRadius: width,
    overflow: "hidden",
    position: "relative",
  },
  artwork: {
    width: "100%",
    height: "100%",
  },
  artworkOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  playingIndicator: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 20,
  },
  bar: {
    width: 3,
    backgroundColor: "#9FE870",
    marginHorizontal: 1,
    borderRadius: 1,
  },
  bar1: { height: 10 },
  bar2: { height: 16 },
  bar3: { height: 8 },
  trackInfo: {
    alignItems: "center",
    marginTop: 32,
  },
  trackTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
  },
  artistName: {
    fontSize: 16,
    color: "rgba(255,255,255,0.7)",
  },
  progressContainer: {
    marginTop: 32,
  },
  progressBar: {
    width: "100%",
    height: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 2,
  },
  progress: {
    height: "100%",
    backgroundColor: "#9FE870",
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  timeText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    paddingHorizontal: 20,
  },
  controlButton: {
    padding: 12,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#9FE870",
    justifyContent: "center",
    alignItems: "center",
  },
});
