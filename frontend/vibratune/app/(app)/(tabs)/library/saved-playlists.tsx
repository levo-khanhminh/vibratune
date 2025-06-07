import React from 'react';
import { StyleSheet, FlatList, View, SafeAreaView, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../../../../src/components/Screen';

// Using the same mock data from library/index.tsx
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

function PlaylistCard({ title, author, songsCount, imageUrl }: { 
  title: string; 
  author: string; 
  songsCount: number;
  imageUrl: string;
}) {
  return (
    <TouchableOpacity style={styles.playlistCard} onPress={() => {}}>
      <Image source={{ uri: imageUrl }} style={styles.playlistImage} />
      <View style={styles.playlistInfo}>
        <Text style={styles.playlistTitle} numberOfLines={1}>{title}</Text>
        <Text style={styles.playlistDetails} numberOfLines={1}>
          {`By ${author} • ${songsCount} songs`}
        </Text>
      </View>
      <TouchableOpacity style={styles.playButton}>
        <Ionicons name="play-circle" size={50} color="#9FE870" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default function SavedPlaylistsScreen() {
  const router = useRouter();

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
          <Text style={styles.headerTitle}>Saved Playlists</Text>
        </View>
        <FlatList
          data={savedPlaylists}
          renderItem={({ item }) => (
            <PlaylistCard
              title={item.title}
              author={item.author}
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