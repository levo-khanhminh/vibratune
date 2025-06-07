import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import Screen from '../../../../../src/components/Screen';
import TrackComponent from '../../../../../src/components/TrackComponent';

const queueTracks = [
  {
    id: '1',
    title: 'Whispers in the Rain',
    artist: 'Mikasa Jeanete',
    imageUrl: 'https://picsum.photos/200',
    duration: '3:45'
  },
  {
    id: '2',
    title: 'Dancing in Moonlight',
    artist: 'Luna Dreams',
    imageUrl: 'https://picsum.photos/201',
    duration: '4:20'
  },
  {
    id: '3',
    title: 'Bass Drops & Starbursts',
    artist: 'Budiarti Reo',
    imageUrl: 'https://picsum.photos/202',
    duration: '3:15'
  }
];

export default function QueueScreen() {
  const router = useRouter();

  const handleRemoveFromQueue = (trackId: string) => {
    // TODO: Implement remove from queue functionality
    console.log('Remove track:', trackId);
  };

  const renderTrackItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.trackItem}>
      <View style={styles.trackNumber}>
        <Text style={styles.trackNumberText}>{index + 1}</Text>
      </View>
      <View style={styles.trackContent}>
        <TrackComponent
          {...item}
          isInQueue={true}
          onRemoveFromQueue={() => handleRemoveFromQueue(item.id)}
          rightElement={
            <TouchableOpacity style={styles.dragHandle}>
              <Ionicons name="reorder-two" size={24} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
          }
        />
      </View>
    </View>
  );

  return (
    <Screen>
      <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-down" size={32} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Queue</Text>
            <Text style={styles.headerSubtitle}>{queueTracks.length} tracks</Text>
          </View>
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>

        {/* Now Playing */}
        <View style={styles.nowPlayingSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Now Playing</Text>
            <View style={styles.playingIndicator}>
              <View style={[styles.bar, styles.bar1]} />
              <View style={[styles.bar, styles.bar2]} />
              <View style={[styles.bar, styles.bar3]} />
            </View>
          </View>
          <TrackComponent
            {...queueTracks[0]}
            isInQueue={true}
            onRemoveFromQueue={() => handleRemoveFromQueue(queueTracks[0].id)}
          />
        </View>

        {/* Queue List */}
        <View style={styles.queueSection}>
          <Text style={styles.sectionTitle}>Next Up</Text>
          <FlatList
            data={queueTracks.slice(1)}
            renderItem={renderTrackItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.queueList}
          />
        </View>
      </SafeAreaView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  backButton: {
    width: 40,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
  clearButton: {
    width: 60,
  },
  clearButtonText: {
    color: '#9FE870',
    fontSize: 14,
  },
  nowPlayingSection: {
    marginBottom: 30,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginRight: 10,
  },
  playingIndicator: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 16,
  },
  bar: {
    width: 3,
    backgroundColor: '#9FE870',
    marginHorizontal: 1,
    borderRadius: 1,
  },
  bar1: { height: 8 },
  bar2: { height: 16 },
  bar3: { height: 10 },
  queueSection: {
    flex: 1,
  },
  queueList: {
    paddingTop: 10,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  trackNumber: {
    width: 30,
    alignItems: 'center',
  },
  trackNumberText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
  },
  trackContent: {
    flex: 1,
  },
  dragHandle: {
    padding: 10,
  },
}); 