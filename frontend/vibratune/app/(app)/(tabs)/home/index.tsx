import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  FlatList,
  View,
  SafeAreaView,
} from "react-native";
import Screen from "../../../../src/components/Screen";
import Header from "../../../../src/components/Header";
import SectionHeader from "../../../../src/components/SectionHeader";
import ArtistComponent from "../../../../src/components/ArtistComponent";
import AlbumComponent from "../../../../src/components/AlbumComponent";
import GenreComponent from "../../../../src/components/GenreComponent";
import PlaylistComponent from "../../../../src/components/PlaylistComponent";
import TrackComponent from "../../../../src/components/TrackComponent";
import { router } from "expo-router";
import { setupPlayer } from "react-native-track-player/lib/src/trackPlayer";
import {
  addTrack,
  playbackControls,
  playRandomTrack,
  playTrack,
} from "../../../../src/services/trackPlayerService";
import TrackPlayer from "react-native-track-player";
import { apiCall, useAuth } from "../../../../src/context/AuthenContext";
import { LoadingIndicator } from "../../../../src/components/LoadingIndicator";
import { Album, Genre, TopArtist, TopTrack } from "../../../../src/types/type";
import { getRandomHexColor } from "../../../../src/utils/random";
import { mapToTrack } from "../../../../src/utils/maptoTrack";

const dailyPlaylists = [
  {
    id: "1",
    title: "Starlit Reverie",
    author: "Budiarti",
    songsCount: 8,
    imageUrl: "https://picsum.photos/206",
  },
  {
    id: "2",
    title: "Midnight Dreams",
    author: "Alex Chen",
    songsCount: 12,
    imageUrl: "https://picsum.photos/207",
  },
  {
    id: "3",
    title: "Chill Vibes",
    author: "Sarah Kim",
    songsCount: 15,
    imageUrl: "https://picsum.photos/208",
  },
  {
    id: "4",
    title: "Evening Jazz",
    author: "Marcus Davis",
    songsCount: 10,
    imageUrl: "https://picsum.photos/209",
  },
  {
    id: "5",
    title: "Morning Coffee",
    author: "Emma Wilson",
    songsCount: 14,
    imageUrl: "https://picsum.photos/210",
  },
];

interface Track {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
}

const tracks: Track[] = [
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
];
const customTracks = tracks.map((item) => {
  return {
    id: item.id,
    title: item.title,
    url: item.audioUrl,
    artist: item.artist,
    artwork: item.imageUrl,
  };
});
export default function HomeScreen() {
  const renderHorizontalList = (
    data: any[],
    Component: React.ComponentType<any>
  ) => (
    <FlatList
      data={data}
      renderItem={({ item }) => <Component {...item} />}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.horizontalList}
    />
  );
  const renderAlbums = () => (
    <FlatList
      data={topAlbums}
      renderItem={({ item }) => <AlbumComponent {...item} />}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.horizontalList}
    />
  );
  const renderGenres = () => (
    <View style={styles.genresContainer}>
      <FlatList
        data={genres}
        renderItem={({ item }) => <GenreComponent {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.genreRow}
        scrollEnabled={false}
      />
    </View>
  );

  const renderDailyPlaylists = () => (
    <FlatList
      data={dailyPlaylists}
      renderItem={({ item }) => (
        <PlaylistComponent
          {...item}
          onPlayPress={() => {
            router.push("player");
          }}
        />
      )}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
      contentContainerStyle={styles.playlistsContainer}
    />
  );

  const renderTracks = () => (
    <FlatList
      data={topTracks}
      renderItem={({ item }) => (
        <TrackComponent
          {...item}
          onPress={async () => {
            await playRandomTrack(mapToTrack(item));
            router.push("(app)/player");
          }}
        />
      )}
      keyExtractor={(item) => String(item.id)}
      scrollEnabled={false}
      contentContainerStyle={styles.tracksContainer}
    />
  );
  const [topArtists, setTopArtists] = useState<TopArtist[]>([]);
  const [topTracks, setTopTracks] = useState<TopTrack[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [topAlbums, setTopAlbums] = useState<Album[]>([]);
  const fetchTopAlbums = async () => {
    const data = await apiCall<any>({
      method: "get",
      url: "/albums/top?count=15",
    });
    console.log(data[0]);
    setTopAlbums(data);
  };
  const fetchTopArtists = async () => {
    const data = await apiCall<any>({
      method: "get",
      url: "/artists/top?count=15",
    });
    setTopArtists(data);
  };
  const fetchTopTracks = async () => {
    const data = await apiCall<any>({
      method: "get",
      url: "/tracks/top?count=10",
    });
    setTopTracks(data);
  };
  const fetchGenres = async () => {
    const data = await apiCall<any>({
      method: "get",
      url: "/genres/",
    });
    // console.log(data);
    setGenres(data);
  };
  useEffect(() => {
    fetchTopArtists();
    fetchTopTracks();
    fetchGenres();
    fetchTopAlbums();
  }, []);
  const { isLoading, isAuthenticated, user } = useAuth();
  console.log("Authenticated User :", user);
  if (isLoading) return <LoadingIndicator />;
  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <Header username={user?.name} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <SectionHeader title="Recently Played" onSeeAllPress={() => {}} />
          {renderHorizontalList(recentlyPlayed, AlbumComponent)} */}

          <SectionHeader
            title="Artists"
            onSeeAllPress={() => {
              router.push("/(app)/(tabs)/home/detail-artist");
            }}
          />
          <FlatList
            data={topArtists}
            renderItem={({ item }) => (
              <ArtistComponent
                {...item}
                onPress={() =>
                  router.push("/(app)/(tabs)/home/detail-artist?id=" + item.id)
                }
              />
            )}
            keyExtractor={(item) => String(item.id)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
          {/* {renderHorizontalList(topArtists, ArtistComponent)} */}

          <SectionHeader title="Top Hit Albums" onSeeAllPress={() => {}} />
          {renderAlbums()}

          <SectionHeader title="Top Daily Playlists" onSeeAllPress={() => {}} />
          {renderDailyPlaylists()}

          <SectionHeader title="Popular Tracks" onSeeAllPress={() => {}} />
          {renderTracks()}

          <SectionHeader title="Genres" onSeeAllPress={() => {}} />
          {renderGenres()}

          <View style={styles.bottomPadding} />
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  horizontalList: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  genresContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  genreRow: {
    justifyContent: "space-between",
  },
  playlistsContainer: {
    marginBottom: 30,
  },
  tracksContainer: {
    marginBottom: 30,
  },
  bottomPadding: {
    height: 100,
  },
});
