import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type SectionHeaderProps = {
  title: string;
  onSeeAllPress?: () => void;
};

export default function SectionHeader({ title, onSeeAllPress }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {onSeeAllPress && (
        <TouchableOpacity onPress={onSeeAllPress}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  seeAll: {
    fontSize: 12,
    color: 'gray',
    fontWeight: '600',
  },
}); 