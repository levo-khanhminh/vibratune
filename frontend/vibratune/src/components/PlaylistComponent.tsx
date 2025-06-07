import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PlaylistComponentProps {
  imageUrl: string;
  title: string;
  author: string;
  songsCount: number;
  onPress?: () => void;
  onPlayPress?: () => void;
}

export default function PlaylistComponent({ 
  imageUrl, 
  title, 
  author,
  songsCount,
  onPress,
  onPlayPress 
}: PlaylistComponentProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.author}>By {author}</Text>
            <Text style={styles.dot}> • </Text>
            <Text style={styles.songsCount}>{songsCount} Songs</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.playButton}
        onPress={onPlayPress}
      >
        <Ionicons name="play" size={22} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 20,
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 15,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 10,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  author: {
    color: '#9B9B9B',
    fontSize: 13,
  },
  dot: {
    color: '#9B9B9B',
    fontSize: 13,
    marginHorizontal: 4,
  },
  songsCount: {
    color: '#9B9B9B',
    fontSize: 13,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e1c28',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 