import React from 'react';
import { StyleSheet, FlatList, View, SafeAreaView, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../../../../src/components/Screen';

// Using the same mock data from library/index.tsx
const savedAlbums = [
  { id: '1', title: 'After Hours', artist: 'The Weeknd', imageUrl: 'https://picsum.photos/204' },
  { id: '2', title: 'Midnights', artist: 'Taylor Swift', imageUrl: 'https://picsum.photos/205' },
  { id: '3', title: 'Renaissance', artist: 'Beyoncé', imageUrl: 'https://picsum.photos/206' },
];

function AlbumCard({ title, artist, imageUrl }: { title: string; artist: string; imageUrl: string }) {
  return (
    <TouchableOpacity style={styles.albumCard} onPress={() => {}}>
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.albumImage}
      />
      <View style={styles.albumInfo}>
        <Text style={styles.albumTitle} numberOfLines={1}>{title}</Text>
        <Text style={styles.albumArtist} numberOfLines={1}>{artist}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function SavedAlbumsScreen() {
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
          <Text style={styles.headerTitle}>Saved Albums</Text>
        </View>
        <FlatList
          data={savedAlbums}
          renderItem={({ item }) => (
            <AlbumCard
              title={item.title}
              artist={item.artist}
              imageUrl={item.imageUrl}
            />
          )}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.albumRow}
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
  albumRow: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  albumCard: {
    width: '48%',
  },
  albumImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 8,
  },
  albumInfo: {
    paddingHorizontal: 4,
  },
  albumTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  albumArtist: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
}); 