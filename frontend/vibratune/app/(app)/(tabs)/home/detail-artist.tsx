// ============================================================================
// IMPORTS SECTION - ADD YOUR CUSTOM COMPONENTS IMPORTS HERE
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
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import TrackComponent from "../../../../src/components/TrackComponent";
import AlbumComponent from "../../../../src/components/AlbumComponent";
import { apiCall } from "../../../../src/context/AuthenContext";
import { DetailArtist } from "../../../../src/types/type";

// Add your custom component imports here:
// import YourCustomAlbum from './components/YourCustomAlbum';
// import YourCustomTrack from './components/YourCustomTrack';
// import YourCustomAlbumList from './components/YourCustomAlbumList';
// import YourCustomTrackList from './components/YourCustomTrackList';

// ============================================================================
// END OF IMPORTS SECTION
// ============================================================================

const { width } = Dimensions.get("window");

const ArtistDetailScreen = () => {
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  const fetchArtist = async () => {
    const data = await apiCall<any>({ method: "get", url: "/artists/" + id });
    setArtist(data);
  };
  useEffect(() => {
    fetchArtist();
  }, []);
  const [artist, setArtist] = useState<DetailArtist>();

  const defaultArtistImage =
    "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=🎤";

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
        {/* Header with Artist Image */}
        <LinearGradient
          colors={["#4c1d95", "#1a1a1a", "#000000"]}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={28} color="#ffffff" />
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>Artist</Text>
            <TouchableOpacity style={styles.menuButton}>
              <Ionicons name="ellipsis-horizontal" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.artistImageContainer}>
            <Image
              source={{ uri: artist?.bigPictureUrl || defaultArtistImage }}
              style={styles.artistImage}
            />
          </View>
          <View style={styles.artistInfo}>
            <View style={styles.artistNameContainer}>
              <Text style={styles.artistName}>{artist?.name}</Text>
              {artist?.name && (
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color="#1db954"
                  style={styles.verifiedIcon}
                />
              )}
            </View>
            <Text style={styles.artistStats}>
              {artist?.monthlyListeners} monthly listeners
            </Text>
            <Text style={styles.artistFollowers}>
              {artist?.numberOfFans} followers
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.playButton}>
              <Ionicons name="play" size={28} color="#000000" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular</Text>
            <FlatList
              data={artist?.tracks.slice(0, 10)}
              renderItem={({ item }) => (
                <TrackComponent
                  {...item}
                  onPress={() => router.push("/(app)/player")}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.albumsList}
            />
            <TouchableOpacity style={styles.showMoreButton}>
              <Text style={styles.showMoreText}>Show all</Text>
            </TouchableOpacity>
          </View>

          {/* Albums Section */}
          <View style={styles.section}>
            {/* ============================================================================ */}
            {/* ALBUMS SECTION - REPLACE WITH YOUR CUSTOM ALBUM LIST */}
            {/* ============================================================================ */}

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Albums</Text>
              <TouchableOpacity>
                <Text style={styles.showAllText}>Show all</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={artist?.albums}
              renderItem={({ item }) => <AlbumComponent {...item} />}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.albumsList}
            />
            {/* ============================================================================ */}
            {/* END OF ALBUMS SECTION */}
            {/* ============================================================================ */}
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.bioText}>{"Artist biography ....."}</Text>
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
  artistImageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  artistImage: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: "#1a1a1a",
  },
  artistInfo: {
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  artistNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  artistName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  verifiedIcon: {
    marginLeft: 8,
  },
  artistStats: {
    fontSize: 16,
    color: "#b3b3b3",
    marginBottom: 4,
  },
  artistFollowers: {
    fontSize: 14,
    color: "#666666",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    gap: 16,
  },
  followButton: {
    borderWidth: 1,
    borderColor: "#ffffff",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  shuffleButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  shuffleButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  playButton: {
    backgroundColor: "#1db954",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  section: {
    marginVertical: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  showAllText: {
    fontSize: 14,
    color: "#b3b3b3",
    fontWeight: "500",
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
  trackSubtitle: {
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
  showMoreButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  showMoreText: {
    fontSize: 14,
    color: "#b3b3b3",
    fontWeight: "500",
  },
  albumsList: {
    paddingVertical: 8,
  },
  albumItem: {
    width: 140,
    marginRight: 16,
  },
  albumImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: "#1a1a1a",
    marginBottom: 8,
  },
  albumTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 4,
  },
  albumYear: {
    fontSize: 12,
    color: "#b3b3b3",
  },
  bioText: {
    fontSize: 14,
    color: "#b3b3b3",
    lineHeight: 20,
  },
});

export default ArtistDetailScreen;
