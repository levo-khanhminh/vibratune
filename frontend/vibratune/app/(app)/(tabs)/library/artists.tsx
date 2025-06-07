import React from 'react';
import { StyleSheet, FlatList, View, SafeAreaView, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../../../../src/components/Screen';

// Using the same mock data from library/index.tsx
const followedArtists = [
  { id: '1', name: 'The Weeknd', imageUrl: 'https://picsum.photos/301' },
  { id: '2', name: 'Taylor Swift', imageUrl: 'https://picsum.photos/302' },
  { id: '3', name: 'Drake', imageUrl: 'https://picsum.photos/303' },
];

function ArtistCard({ name, imageUrl }: { name: string; imageUrl: string }) {
  return (
    <TouchableOpacity style={styles.artistCard} onPress={() => {}}>
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.artistImage}
      />
      <Text style={styles.artistName}>{name}</Text>
      <Text style={styles.artistLabel}>Artist</Text>
    </TouchableOpacity>
  );
}

export default function ArtistsScreen() {
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
          <Text style={styles.headerTitle}>Followed Artists</Text>
        </View>
        <FlatList
          data={followedArtists}
          renderItem={({ item }) => (
            <ArtistCard
              name={item.name}
              imageUrl={item.imageUrl}
            />
          )}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.artistRow}
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
    marginTop: 70,
    flexDirection: 'row',
    alignItems: 'center',
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
  artistRow: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  artistCard: {
    width: '48%',
    alignItems: 'center',
  },
  artistImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 100,
    marginBottom: 12,
  },
  artistName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  artistLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
}); 