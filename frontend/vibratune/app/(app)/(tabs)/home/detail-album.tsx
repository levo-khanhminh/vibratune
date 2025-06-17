// ============================================================================
// IMPORTS SECTION - ADD YOUR CUSTOM TRACK COMPONENT IMPORTS HERE
// ============================================================================

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import TrackComponent from "../../../../src/components/TrackComponent";
import { useAlbumSaved } from "../../../../src/context/AlbumSavedContext";
import { apiCall } from "../../../../src/context/AuthenContext";
import { Album } from "../../../../src/types/type";
import { mapMinutesToHMM } from "../../../../src/utils/mapDuration";
import { playAlbumTracks } from "../../../../src/services/trackPlayerService";
import { mapToTrack } from "../../../../src/utils/maptoTrack";

// Add your custom track component imports here:
// import YourCustomTrack from './components/YourCustomTrack';
// import YourCustomTrackList from './components/YourCustomTrackList';

// ============================================================================
// END OF IMPORTS SECTION
// ============================================================================

const { width, height } = Dimensions.get("window");

type Track = {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
};
const albumData = {
  id: "1",
  title: "Random Access Memories",
  artist: "Daft Punk",
  year: "2013",
  genre: "Electronic, Disco, Funk",
  description:
    "Random Access Memories is the fourth studio album by French electronic music duo Daft Punk, released in 2013. The album pays tribute to late 1970s and early 1980s American music, particularly from Los Angeles.",
  coverImage: null, // Set to null to show default
  totalDuration: "74 min",
  tracks: [
    {
      id: "1",
      title: "Whispers in the Rain",
      artist: "Mikasa Jeanete",
      imageUrl: "https://picsum.photos/200",
      audioUrl:
        "https://d15dozolzarq2g.cloudfront.net/Alex_Zado_Fairy_Elephant.mp3",
    },
    {
      id: "2",
      title: "Dancing in Moonlight",
      artist: "Luna Dreams",
      imageUrl: "https://picsum.photos/200",
      audioUrl: "https://d15dozolzarq2g.cloudfront.net/AssafAyalon_Willie.mp3",
    },
    {
      id: "3",
      title: "Bass Drops & Starbursts",
      artist: "Budiarti Reo",
      imageUrl: "https://picsum.photos/211",
      audioUrl:
        "https://d15dozolzarq2g.cloudfront.net/BalloonPlanet-CityLightsBounce.mp3",
    },
    {
      id: "4",
      title: "Midnight Groove",
      artist: "Budiarti Reo",
      imageUrl: "https://picsum.photos/212",
      audioUrl:
        "https://d15dozolzarq2g.cloudfront.net/PRINS-GoodbyetotheOldMe.mp3",
    },
    {
      id: "5",
      title: "Electric Dreams",
      artist: "Budiarti Reo",
      imageUrl: "https://picsum.photos/213",
      audioUrl:
        "https://d15dozolzarq2g.cloudfront.net/VeaceslavDraganov-Home.mp3",
    },
  ],
};

const AlbumDetailScreen = () => {
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  console.log(id);
  const fetchAlbum = async () => {
    console.log("Fetching....");
    const data = await apiCall<any>({ method: "get", url: "/albums/" + id });
    const { releaseDate } = data;
    console.log(releaseDate);
    // console.log(data);
    setAlbum(data);
  };
  useEffect(() => {
    fetchAlbum();
  }, []);
  const [album, setAlbum] = useState<Album>();
  const { isAlbumSaved, saveAlbum, unsaveAlbum } = useAlbumSaved();
  const [isSaved, setIsSaved] = useState(isAlbumSaved(id[0]));
  function handleToggleSaveALbum() {
    const { id, title, artist, coverImage } = albumData;
    const album = { id, title, artist, imageUrl: coverImage };
    const flag = isAlbumSaved(id);
    if (flag) {
      unsaveAlbum(id);
    } else {
      saveAlbum(album);
    }
    setIsSaved(!flag);
  }
  const handlePlayAlbum = async () => {
    await playAlbumTracks(album?.tracks.map((item) => mapToTrack(item)) || []);
    router.push("/(app)/player");
  };
  const router = useRouter();
  // Sample data - replace with actual props/data
  const totalDuration =
    album?.tracks.reduce((acc, curr) => acc + curr.duration, 0) || 0;
  const defaultAlbumImage =
    "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=♪";
  const renderTrackItem = (track: any, index: number) => {
    return (
      <TrackComponent
        key={index}
        {...track}
        onPress={() => {
          router.push("(app)/player");
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Header with Album Image */}
        <LinearGradient
          colors={["#132840", "#000000", "#000000"]}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={28} color="#ffffff" />
            </TouchableOpacity>
            <Text
              style={{ color: "#ffffff", fontSize: 18, fontWeight: "bold" }}
            >
              Album Detail
            </Text>
            <TouchableOpacity style={styles.menuButton}>
              <Ionicons name="ellipsis-horizontal" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <View style={styles.albumImageContainer}>
            <Image
              source={{
                uri: album?.bigCoverImageUrl || defaultAlbumImage,
              }}
              style={styles.albumImage}
            />
          </View>

          <View style={styles.albumInfo}>
            <Text style={styles.albumTitle}>{album?.name}</Text>
            <Text style={styles.albumArtist}>{album?.artist.name}</Text>
            <Text style={styles.albumMeta}>
              {new Date(album?.releaseDate || "2025-06-10").getFullYear()} •{" "}
              {mapMinutesToHMM(totalDuration)}
              {/* {totalDuration} */}
            </Text>
          </View>
        </LinearGradient>

        {/* Content Section */}
        <View style={styles.content}>
          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.description}>
              {album?.description || "Album Description"}
            </Text>
          </View>

          {/* Genre */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Genre</Text>
            <Text style={styles.genreText}>{album?.genre.name}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={handlePlayAlbum}
            >
              <Ionicons name="play" size={24} color="#000000" />
              <Text style={styles.playButtonText}>Play</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shuffleButton}
              onPress={handleToggleSaveALbum}
            >
              <Ionicons name="add" size={20} color="#ffffff" />
              <Text style={styles.shuffleButtonText}>
                {isSaved ? "Saved" : "Save"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Track List */}
          <View style={styles.trackList}>
            <Text style={styles.trackListTitle}>
              {album?.tracks.length} songs
            </Text>

            {/* Option 2: Replace this map function with your custom track list */}
            {/* You can replace the entire map with: */}
            {/* <YourCustomTrackList tracks={albumData.tracks} /> */}

            {album?.tracks.map((track, index) => renderTrackItem(track, index))}

            {/* Alternative: If you want to use individual track components: */}
            {/* {albumData.tracks.map((track, index) => (
              <YourCustomTrack 
                key={track.id}
                track={track}
                index={index}
                onPress={() => console.log('Track pressed:', track.title)}
                onMenuPress={() => console.log('Menu pressed for:', track.title)}
              />
            ))} */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  scrollView: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: StatusBar.currentHeight || 44,
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  menuButton: {
    padding: 8,
  },
  albumImageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  albumImage: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 8,
    backgroundColor: "#1a1a1a",
  },
  albumInfo: {
    alignItems: "center",
    paddingHorizontal: 24,
  },
  albumTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  albumArtist: {
    fontSize: 18,
    color: "#b3b3b3",
    marginBottom: 4,
  },
  albumMeta: {
    fontSize: 14,
    color: "#666666",
  },
  content: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 16,
  },
  section: {
    marginVertical: 16,
  },
  description: {
    fontSize: 14,
    color: "#b3b3b3",
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 8,
  },
  genreText: {
    fontSize: 14,
    color: "#1db954",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    gap: 18,
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#9FE870",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
    width: "60%",
    justifyContent: "center",
    gap: 10,
  },
  playButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
  shuffleButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    // flex: 1,
    borderColor: "#333333",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  shuffleButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  favoriteButton: {
    padding: 12,
  },
  trackList: {
    marginTop: 8,
    paddingBottom: 120,
  },
  trackListTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 16,
  },
  trackItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  trackInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  trackNumber: {
    fontSize: 16,
    color: "#666666",
    width: 24,
    textAlign: "center",
  },
  trackDetails: {
    marginLeft: 16,
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 2,
  },
  trackArtist: {
    fontSize: 14,
    color: "#b3b3b3",
  },
  trackRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  trackDuration: {
    fontSize: 14,
    color: "#b3b3b3",
    minWidth: 40,
    textAlign: "right",
  },
  trackMenu: {
    padding: 8,
  },
});

export default AlbumDetailScreen;
