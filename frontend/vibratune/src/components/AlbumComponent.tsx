import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface AlbumComponentProps {
  imageUrl: string;
  title: string;
  artist: string;
  onPress?: () => void;
}

export default function AlbumComponent({ 
  imageUrl, 
  title, 
  artist, 
  onPress 
}: AlbumComponentProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image}
        />
      </View>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <Text style={styles.artist} numberOfLines={1}>{artist}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    marginRight: 15,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  artist: {
    color: '#9B9B9B',
    fontSize: 12,
  },
}); 