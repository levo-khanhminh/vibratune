import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TrackMenu from './TrackMenu';

interface TrackComponentProps {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  duration?: string;
  onPress?: () => void;
  isInQueue?: boolean;
  onAddToQueue?: () => void;
  onRemoveFromQueue?: () => void;
  rightElement?: React.ReactNode;
}

export default function TrackComponent({
  title,
  artist,
  imageUrl,
  duration,
  onPress,
  isInQueue,
  onAddToQueue,
  onRemoveFromQueue,
  rightElement
}: TrackComponentProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Implement favorite functionality
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{artist}</Text>
      </View>
      <View style={styles.actions}>
        {duration && (
          <Text style={styles.duration}>{duration}</Text>
        )}
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={handleToggleFavorite}
        >
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color={isFavorite ? '#ff4444' : 'rgba(255,255,255,0.8)'} 
          />
        </TouchableOpacity>
        {rightElement || (
          <TrackMenu
            isInQueue={isInQueue}
            isFavorite={isFavorite}
            onAddToQueue={onAddToQueue}
            onRemoveFromQueue={onRemoveFromQueue}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  artist: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  duration: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    marginRight: 12,
  },
  favoriteButton: {
    padding: 8,
    marginRight: 4,
  },
}); 