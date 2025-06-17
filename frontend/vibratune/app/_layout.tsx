import { Stack } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import { COLORS } from "../src/constants/colors";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";
import { NotificationProvider } from "../src/context/NotificationContext";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { setupPlayer } from "react-native-track-player/lib/src/trackPlayer";
import { TrackFavouriteProvider } from "../src/context/TrackFavouriteContext";
import { AlbumSavedProvider } from "../src/context/AlbumSavedContext";
import { PlaylistSavedProvider } from "../src/context/PlaylistSavedContext";
import { AuthProvider, useAuth } from "../src/context/AuthenContext";
import AuthenticatedRoutes from "../src/components/AuthenticatedRoutes";

// Keep splash screen visible while we initialize
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  async function initializeSetUPlayer() {
    try {
      const setupResult = await setupPlayer();
      console.log("TrackPlayer setup complete:", setupResult);
    } catch (error) {
      console.error("Failed to setup TrackPlayer:", error);
    }
  }

  useEffect(() => {
    initializeSetUPlayer();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.secondary]}
      style={{ flex: 1 }}
      onLayout={onLayoutRootView}
    >
      <NotificationProvider>
        <AuthProvider>
          <PlaylistSavedProvider>
            <AlbumSavedProvider>
              <TrackFavouriteProvider>
                <ExpoStatusBar style="light" />
                <AuthenticatedRoutes />
              </TrackFavouriteProvider>
            </AlbumSavedProvider>
          </PlaylistSavedProvider>
        </AuthProvider>
      </NotificationProvider>
    </LinearGradient>
  );
}
