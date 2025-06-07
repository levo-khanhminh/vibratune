import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function LibraryLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="favourites"
        options={{ 
          headerShown: false,
          presentation: 'modal',
          animation: 'slide_from_right'
        }}
      />
      <Stack.Screen 
        name="artists"
        options={{ 
          headerShown: false,
          presentation: 'modal',
          animation: 'slide_from_right'
        }}
      />
      <Stack.Screen 
        name="saved-albums"
        options={{ 
          headerShown: false,
          presentation: 'modal',
          animation: 'slide_from_right'
        }}
      />
      <Stack.Screen 
        name="saved-playlists"
        options={{ 
          headerShown: false,
          presentation: 'modal',
          animation: 'slide_from_right'
        }}
      />
      <Stack.Screen 
        name="created-playlists"
        options={{ 
          headerShown: false,
          presentation: 'modal',
          animation: 'slide_from_right'
        }}
      />
    </Stack>
  );
} 