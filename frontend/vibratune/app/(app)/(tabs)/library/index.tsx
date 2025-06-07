import React from 'react';
import { ScrollView, StyleSheet, FlatList, View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Screen from '../../../../src/components/Screen';
import Header from '../../../../src/components/Header';
import SectionHeader from '../../../../src/components/SectionHeader';
import TrackComponent from '../../../../src/components/TrackComponent';
import AlbumComponent from '../../../../src/components/AlbumComponent';
import PlaylistComponent from '../../../../src/components/PlaylistComponent';

// Mock data
const favoriteTracks = [
  {
    id: '1',
    title: 'Bass Drops & Starbursts',
    artist: 'Budiarti Reo',
    imageUrl: 'https://picsum.photos/211'
  },
  {
    id: '2',
    title: 'Midnight Groove',
    artist: 'Budiarti Reo',
    imageUrl: 'https://picsum.photos/212'
  }
];

const followedArtists = [
  { id: '1', name: 'The Weeknd', imageUrl: 'https://picsum.photos/301' },
  { id: '2', name: 'Taylor Swift', imageUrl: 'https://picsum.photos/302' },
  { id: '3', name: 'Drake', imageUrl: 'https://picsum.photos/303' },
];

const savedAlbums = [
  { id: '1', title: 'After Hours', artist: 'The Weeknd', imageUrl: 'https://picsum.photos/204' },
  { id: '2', title: 'Midnights', artist: 'Taylor Swift', imageUrl: 'https://picsum.photos/205' },
  { id: '3', title: 'Renaissance', artist: 'Beyoncé', imageUrl: 'https://picsum.photos/206' },
];

const savedPlaylists = [
  { 
    id: '1', 
    title: 'Chill Vibes', 
    author: 'Sarah Kim', 
    songsCount: 15,
    imageUrl: 'https://picsum.photos/207'
  },
  { 
    id: '2', 
    title: 'Evening Jazz', 
    author: 'Marcus Davis', 
    songsCount: 10,
    imageUrl: 'https://picsum.photos/208'
  }
];

const createdPlaylists = [
  { 
    id: '1', 
    title: 'My Workout Mix', 
    author: 'You', 
    songsCount: 25,
    imageUrl: 'https://picsum.photos/209'
  },
  { 
    id: '2', 
    title: 'Coding Session', 
    author: 'You', 
    songsCount: 18,
    imageUrl: 'https://picsum.photos/210'
  }
];

export default function LibraryScreen() {
  const router = useRouter();

  const renderLibraryCards = () => (
    <View style={styles.cardsSection}>
      <TouchableOpacity 
        style={[styles.libraryCard, { marginRight: 15 }]} 
        onPress={() => router.push('/(app)/(tabs)/library/favourites')}
      >
        <View style={[styles.cardIconContainer, { backgroundColor: 'rgba(159, 232, 112, 0.2)' }]}>
          <Ionicons name="heart" size={32} color="#9FE870" />
        </View>
        <Text style={styles.cardTitle}>Favourite Tracks</Text>
        <Text style={styles.cardCount}>{favoriteTracks.length} songs</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.libraryCard} 
        onPress={() => router.push('/(app)/(tabs)/library/artists')}
      >
        <View style={[styles.cardIconContainer, { backgroundColor: 'rgba(138, 180, 255, 0.2)' }]}>
          <Ionicons name="people" size={32} color="#8AB4FF" />
        </View>
        <Text style={styles.cardTitle}>Followed Artists</Text>
        <Text style={styles.cardCount}>{followedArtists.length} artists</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAlbums = () => (
    <View style={styles.section}>
      <SectionHeader 
        title="Saved Albums" 
        onSeeAllPress={() => router.push('/(app)/(tabs)/library/saved-albums')} 
      />
      <FlatList
        data={savedAlbums}
        renderItem={({ item }) => (
          <AlbumComponent {...item} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />
    </View>
  );

  const renderSavedPlaylists = () => (
    <View style={styles.section}>
      <SectionHeader 
        title="Saved Playlists" 
        onSeeAllPress={() => router.push('/(app)/(tabs)/library/saved-playlists')} 
      />
      <FlatList
        data={savedPlaylists}
        renderItem={({ item }) => (
          <PlaylistComponent
            {...item}
            onPlayPress={() => {}}
          />
        )}
        keyExtractor={item => item.id}
        scrollEnabled={false}
      />
    </View>
  );

  const renderCreatedPlaylists = () => (
    <View style={styles.section}>
      <SectionHeader 
        title="Created Playlists" 
        onSeeAllPress={() => router.push('/(app)/(tabs)/library/created-playlists')} 
      />
      <FlatList
        data={createdPlaylists}
        renderItem={({ item }) => (
          <PlaylistComponent
            {...item}
            onPlayPress={() => {}}
          />
        )}
        keyExtractor={item => item.id}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <Header username="John" />
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderLibraryCards()}
          {renderAlbums()}
          {renderSavedPlaylists()}
          {renderCreatedPlaylists()}
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
  section: {
    marginBottom: 30,
  },
  cardsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  libraryCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  cardIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  cardCount: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  horizontalList: {
    paddingHorizontal: 20,
  },
  bottomPadding: {
    height: 100,
  },
}); 