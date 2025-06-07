import { Stack } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { COLORS } from '../src/constants/colors';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { NotificationProvider } from '../src/context/NotificationContext';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { setupPlayer } from 'react-native-track-player/lib/src/trackPlayer';

// Keep splash screen visible while we initialize
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  async function initializeSetUPlayer() {
    try {
      const setupResult = await setupPlayer();
      console.log('TrackPlayer setup complete:', setupResult);
    } catch (error) {
      console.error('Failed to setup TrackPlayer:', error);
    }
  }

  useEffect(() => {
    initializeSetUPlayer();
  }, []);

  // Make authentication state available globally
  global.setAuthState = setIsAuthenticated;

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <NotificationProvider>
      <ExpoStatusBar style="light" />
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={{ flex: 1 }}
        onLayout={onLayoutRootView}
      >
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#000' },
          }}
        >
          <Stack.Screen 
            name="index" 
            options={{
              // Prevent going back to index after login
              gestureEnabled: false,
            }}
          />
          <Stack.Screen 
            name="(auth)" 
            options={{
              // Prevent going back to auth after login
              gestureEnabled: false,
            }}
            redirect={isAuthenticated} 
          />
          <Stack.Screen 
            name="(app)" 
            options={{
              // Prevent going back to auth after login
              gestureEnabled: false,
            }}
            redirect={!isAuthenticated} 
          />
        </Stack>
      </LinearGradient>
    </NotificationProvider>
  );
} 