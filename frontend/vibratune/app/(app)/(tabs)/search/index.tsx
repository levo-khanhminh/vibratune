import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Screen from "../../../../src/components/Screen";
import SearchBar from "../../../../src/components/SearchBar";
import SectionHeader from "../../../../src/components/SectionHeader";
import TrackComponent from "../../../../src/components/TrackComponent";
import { apiCall } from "../../../../src/context/AuthenContext"; // Assuming TopTrack is imported here or defined globally
import { TopTrack } from "../../../../src/types/type";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tracks, setTracks] = useState<TopTrack[]>([]); // State now only holds an array of Track objects
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // --- Consolidated Track Search Function (Fetches by Title, Artist, Album) ---
  const fetchTracks = async () => {
    setTracks([]); // Clear previous results
    setError(null);

    if (!searchQuery.trim()) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      // Fetch tracks by title
      const titleResponsePromise = apiCall<TopTrack[]>({
        method: "get",
        url: `/tracks/search?title=${encodeURIComponent(searchQuery)}`,
      });

      // Fetch tracks by artist name
      const artistResponsePromise = apiCall<TopTrack[]>({
        method: "get",
        url: `/tracks/artist?name=${encodeURIComponent(searchQuery)}`,
      });

      // Fetch tracks by album name
      const albumResponsePromise = apiCall<TopTrack[]>({
        method: "get",
        url: `/tracks/album?name=${encodeURIComponent(searchQuery)}`,
      });

      // Use Promise.all to await all three requests concurrently
      const [titleTracks, artistTracks, albumTracks] = await Promise.all([
        titleResponsePromise,
        artistResponsePromise,
        albumResponsePromise,
      ]);

      // Combine all results and remove duplicates
      const allCombinedTracks = [
        ...titleTracks,
        ...artistTracks,
        ...albumTracks,
      ];

      // To remove duplicates, you can use a Set or a Map
      const uniqueTracksMap = new Map<string, TopTrack>();
      allCombinedTracks.forEach((track) => {
        // Use track.id as the unique key. If IDs are not unique across categories
        // or if you want to consider title+artist as unique, adjust this.
        uniqueTracksMap.set(track.id.toString(), track);
      });

      setTracks(Array.from(uniqueTracksMap.values())); // Convert Map values back to an array
    } catch (err: any) {
      console.error("Track search API error:", err);
      setError("Failed to load tracks. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Debouncing Search with useEffect (remains the same) ---
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      fetchTracks();
    }, 500);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // --- Main Content Renderer (remains largely the same, focusing on tracks) ---
  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.centeredMessage}>
          <ActivityIndicator size="large" color="#1DB954" />
          <Text style={styles.messageText}>Searching for tracks...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centeredMessage}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    if (!searchQuery.trim()) {
      return (
        <View style={styles.centeredMessage}>
          <Text style={styles.messageText}>
            Type to find your favorite tracks!
          </Text>
        </View>
      );
    }

    if (tracks.length === 0 && searchQuery.trim()) {
      return (
        <View style={styles.centeredMessage}>
          <Text style={styles.messageText}>
            No tracks found for "{searchQuery}".
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.section}>
          <SectionHeader title="Found Tracks" />
          <FlatList
            data={tracks}
            renderItem={({ item }) => (
              <TrackComponent
                {...item}
                // onMorePress handler if needed for your component
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Screen>
        <View style={styles.container}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onMicPress={() => {
              /* Implement voice search if needed */
            }}
          />
          {renderContent()}
        </View>
      </Screen>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    paddingTop: 50,
  },
  content: {
    paddingTop: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 25,
  },
  centeredMessage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  messageText: {
    color: "#ccc",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});
