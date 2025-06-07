import React, { useState } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Screen from '../../../../src/components/Screen';
import SearchBar from '../../../../src/components/SearchBar';
import SectionHeader from '../../../../src/components/SectionHeader';
import TrackComponent from '../../../../src/components/TrackComponent';
import PlaylistComponent from '../../../../src/components/PlaylistComponent';
import ArtistComponent from '../../../../src/components/ArtistComponent';

// Mock data for search results
const matchedTracks = [
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

const matchedPlaylists = [
  {
    id: '1',
    title: 'Chill Vibes',
    author: 'Sarah Kim',
    songsCount: 15,
    imageUrl: 'https://picsum.photos/213'
  },
  {
    id: '2',
    title: 'Evening Jazz',
    author: 'Marcus Davis',
    songsCount: 10,
    imageUrl: 'https://picsum.photos/214'
  }
];

const matchedArtists = [
  {
    id: '1',
    name: 'Budiarti Reo',
    imageUrl: 'https://picsum.photos/215'
  },
  {
    id: '2',
    name: 'Sarah Kim',
    imageUrl: 'https://picsum.photos/216'
  }
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const renderTracks = () => (
    <View style={styles.section}>
      <SectionHeader title="Matched Tracks" />
      <FlatList
        data={matchedTracks}
        renderItem={({ item }) => (
          <TrackComponent
            {...item}
            // onMorePress={() => {}}
          />
        )}
        keyExtractor={item => item.id}
        scrollEnabled={false}
      />
    </View>
  );

  const renderPlaylists = () => (
    <View style={styles.section}>
      <SectionHeader title="Matched Playlists" />
      <FlatList
        data={matchedPlaylists}
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

  const renderArtists = () => (
    <View style={styles.section}>
      <SectionHeader title="Matched Artists" />
      <FlatList
        data={matchedArtists}
        renderItem={({ item }) => (
          <ArtistComponent {...item} />
        )}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.artistsList}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Screen>
        <View style={styles.container}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onMicPress={() => {}}
          />
          <FlatList
            data={[1]}
            renderItem={() => (
              <View>
                {renderTracks()}
                {renderPlaylists()}
                {renderArtists()}
              </View>
            )}
            keyExtractor={() => 'search-results'}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
          />
        </View>
      </Screen>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    paddingTop: 30,
  },
  content: {
    paddingBottom: 100,
  },
  section: {
    marginBottom: 25,
  },
  artistsList: {
    paddingHorizontal: 20,
  },
}); 