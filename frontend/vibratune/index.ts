import TrackPlayer from "react-native-track-player";
import { PlaybackService } from "./src/services/PlaybackService";

// // Register the playback service before loading the app

// Load the app
import "expo-router/entry";
TrackPlayer.registerPlaybackService(() => PlaybackService);
