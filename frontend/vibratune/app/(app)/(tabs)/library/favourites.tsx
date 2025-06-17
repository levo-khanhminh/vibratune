import React from "react";
import {
  StyleSheet,
  FlatList,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Screen from "../../../../src/components/Screen";
import TrackComponent from "../../../../src/components/TrackComponent";
import { useTrackFavourites } from "../../../../src/context/TrackFavouriteContext";

// Using the same mock data from library/index.tsx
// const favoriteTracks = [
//   {
//     id: '1',
//     title: 'Bass Drops & Starbursts',
//     artist: 'Budiarti Reo',
//     imageUrl: 'https://picsum.photos/211'
//   },
//   {
//     id: '2',
//     title: 'Midnight Groove',
//     artist: 'Budiarti Reo',
//     imageUrl: 'https://picsum.photos/212'
//   }
// ];

export default function FavouritesScreen() {
  const router = useRouter();
  const { favourites } = useTrackFavourites();
  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Favourite Tracks</Text>
        </View>
        <FlatList
          data={favourites}
          renderItem={({ item }) => (
            <TrackComponent {...item} onPress={() => {}} />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 80,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  listContent: {
    paddingBottom: 100,
  },
});
