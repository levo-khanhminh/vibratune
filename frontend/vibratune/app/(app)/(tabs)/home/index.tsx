import React from 'react';
import { ScrollView, StyleSheet, FlatList, View, SafeAreaView } from 'react-native';
import Screen from '../../../../src/components/Screen';
import Header from '../../../../src/components/Header';
import SectionHeader from '../../../../src/components/SectionHeader';
import ArtistComponent from '../../../../src/components/ArtistComponent';
import AlbumComponent from '../../../../src/components/AlbumComponent';
import GenreComponent from '../../../../src/components/GenreComponent';
import PlaylistComponent from '../../../../src/components/PlaylistComponent';
import TrackComponent from '../../../../src/components/TrackComponent';
import { router } from 'expo-router';


// Mock data
const recentlyPlayed = [
  { id: '1', title: 'Blinding Lights', artist: 'The Weeknd', imageUrl: 'https://picsum.photos/200' },
  { id: '2', title: 'Stay', artist: 'Kid Laroi', imageUrl: 'https://picsum.photos/201' },
  { id: '3', title: 'Blinding Lights', artist: 'The Weeknd', imageUrl: 'https://picsum.photos/200' },
  { id: '4', title: 'Stay', artist: 'Kid Laroi', imageUrl: 'https://picsum.photos/201' },
  { id: '5', title: 'Blinding Lights', artist: 'The Weeknd', imageUrl: 'https://picsum.photos/200' },
  { id: '6', title: 'Stay', artist: 'Kid Laroi', imageUrl: 'https://picsum.photos/201' },
];

const topArtists = [
  { id: '1', name: 'The Weeknd', imageUrl: 'https://picsum.photos/202' },
  { id: '2', name: 'Taylor Swift', imageUrl: 'https://picsum.photos/203' },
  { id: '3', name: 'The Weeknd', imageUrl: 'https://picsum.photos/202' },
  { id: '4', name: 'Taylor Swift', imageUrl: 'https://picsum.photos/203' },
  { id: '5', name: 'The Weeknd', imageUrl: 'https://picsum.photos/202' },
  { id: '6', name: 'Taylor Swift', imageUrl: 'https://picsum.photos/203' },
];

const topAlbums = [
  { id: '1', title: 'After Hours', artist: 'The Weeknd', imageUrl: 'https://picsum.photos/204' },
  { id: '2', title: 'Midnights', artist: 'Taylor Swift', imageUrl: 'https://picsum.photos/205' },
  { id: '3', title: 'After Hours', artist: 'The Weeknd', imageUrl: 'https://picsum.photos/204' },
  { id: '4', title: 'Midnights', artist: 'Taylor Swift', imageUrl: 'https://picsum.photos/205' },
  { id: '5', title: 'After Hours', artist: 'The Weeknd', imageUrl: 'https://picsum.photos/204' },
  { id: '6', title: 'Midnights', artist: 'Taylor Swift', imageUrl: 'https://picsum.photos/205' },
];

const genres = [
  { id: '1', name: 'Pop', color1: '#FF6B6B', color2: '#FFE66D' },
  { id: '2', name: 'Hip Hop', color1: '#4ECDC4', color2: '#45B7AF' },
  { id: '3', name: 'Rock', color1: '#96CEB4', color2: '#FFEEAD' },
  { id: '4', name: 'Jazz', color1: '#D4A5A5', color2: '#9E7777' },
  { id: '5', name: 'Jazz', color1: '#D4A5A5', color2: '#9E7777' },
  { id: '6', name: 'Jazz', color1: '#D4A5A5', color2: '#9E7777' },
];

const dailyPlaylists = [
  { 
    id: '1', 
    title: 'Starlit Reverie', 
    author: 'Budiarti', 
    songsCount: 8,
    imageUrl: 'https://picsum.photos/206'
  },
  { 
    id: '2', 
    title: 'Midnight Dreams', 
    author: 'Alex Chen', 
    songsCount: 12,
    imageUrl: 'https://picsum.photos/207'
  },
  { 
    id: '3', 
    title: 'Chill Vibes', 
    author: 'Sarah Kim', 
    songsCount: 15,
    imageUrl: 'https://picsum.photos/208'
  },
  { 
    id: '4', 
    title: 'Evening Jazz', 
    author: 'Marcus Davis', 
    songsCount: 10,
    imageUrl: 'https://picsum.photos/209'
  },
  { 
    id: '5', 
    title: 'Morning Coffee', 
    author: 'Emma Wilson', 
    songsCount: 14,
    imageUrl: 'https://picsum.photos/210'
  }
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
    id: '1',
    title: 'Whispers in the Rain',
    artist: 'Mikasa Jeanete',
    imageUrl: 'https://picsum.photos/200',
    audioUrl: 'https://example.com/audio1.mp3'
  },
  {
    id: '2',
    title: 'Dancing in Moonlight',
    artist: 'Luna Dreams',
    imageUrl: 'https://picsum.photos/200',
    audioUrl: 'https://example.com/audio2.mp3'
  },
  {
    id: '3',
    title: 'Bass Drops & Starbursts',
    artist: 'Budiarti Reo',
    imageUrl: 'https://picsum.photos/211',
    audioUrl: 'https://example.com/audio3.mp3'
  },
  {
    id: '4',
    title: 'Midnight Groove',
    artist: 'Budiarti Reo',
    imageUrl: 'https://picsum.photos/212',
    audioUrl: 'https://example.com/audio4.mp3'
  },
  {
    id: '5',
    title: 'Electric Dreams',
    artist: 'Budiarti Reo',
    imageUrl: 'https://picsum.photos/213',
    audioUrl: 'https://example.com/audio5.mp3'
  }
];

export default function HomeScreen() {
  async function handlePlayTrack(track : Track){

    router.push('(app)/player');
  }
  const renderHorizontalList = (data: any[], Component: React.ComponentType<any>) => (
    <FlatList
      data={data}
      renderItem={({ item }) => <Component {...item} />}
      keyExtractor={item => item.id}
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
        keyExtractor={item => item.id}
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
           
            router.push('player');
          }}
        />
      )}
      keyExtractor={item => item.id}
      scrollEnabled={false}
      contentContainerStyle={styles.playlistsContainer}
    />
  );

  const renderTracks = () => (
    <FlatList
      data={tracks}
      renderItem={({ item }) => (
        <TrackComponent
          {...item}
          onPress={() => {
            router.push('(app)/player');
          }}
        />
      )}
      keyExtractor={item => item.id}
      scrollEnabled={false}
      contentContainerStyle={styles.tracksContainer}
    />
  );

  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <Header username="John" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <SectionHeader title="Recently Played" onSeeAllPress={() => {}} />
          {renderHorizontalList(recentlyPlayed, AlbumComponent)}

          <SectionHeader title="Top Artists" onSeeAllPress={() => {}} />
          {renderHorizontalList(topArtists, ArtistComponent)}

          <SectionHeader title="Top Hit Albums" onSeeAllPress={() => {}} />
          {renderHorizontalList(topAlbums, AlbumComponent)}

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
    justifyContent: 'space-between',
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