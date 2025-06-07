import React from 'react';
import { StyleSheet, FlatList, View, SafeAreaView, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../../../../src/components/Screen';

// Using the same mock data from library/index.tsx
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

function PlaylistCard({ title, songsCount, imageUrl }: { 
  title: string;
  songsCount: number;
  imageUrl: string;
}) {
  return (
    <TouchableOpacity style={styles.playlistCard} onPress={() => {}}>
      <Image source={{ uri: imageUrl }} style={styles.playlistImage} />
      <View style={styles.playlistInfo}>
        <Text style={styles.playlistTitle} numberOfLines={1}>{title}</Text>
        <Text style={styles.playlistDetails} numberOfLines={1}>
          {`${songsCount} songs`}
        </Text>
      </View>
      <TouchableOpacity style={styles.playButton}>
        <Ionicons name="play-circle" size={50} color="#9FE870" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default function CreatedPlaylistsScreen() {
  const router = useRouter();

  const renderHeader = () => (
    <TouchableOpacity style={styles.createPlaylistButton} onPress={() => {}}>
      <View style={styles.createPlaylistIcon}>
        <Ionicons name="add" size={32} color="#000" />
      </View>
      <View style={styles.createPlaylistInfo}>
        <Text style={styles.createPlaylistTitle}>New Playlist</Text>
        <Text style={styles.createPlaylistSubtitle}>Add your favorite songs</Text>
      </View>
    </TouchableOpacity>
  );

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
          <Text style={styles.headerTitle}>Created Playlists</Text>
        </View>
        <FlatList
          data={createdPlaylists}
          ListHeaderComponent={renderHeader}
          renderItem={({ item }) => (
            <PlaylistCard
              title={item.title}
              songsCount={item.songsCount}
              imageUrl={item.imageUrl}
            />
          )}
          keyExtractor={item => item.id}
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  createPlaylistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  createPlaylistIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9FE870',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  createPlaylistInfo: {
    flex: 1,
  },
  createPlaylistTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  createPlaylistSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  playlistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  playlistImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  playlistInfo: {
    flex: 1,
    marginLeft: 16,
    marginRight: 12,
  },
  playlistTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  playlistDetails: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  playButton: {
    padding: 8,
  },
}); 