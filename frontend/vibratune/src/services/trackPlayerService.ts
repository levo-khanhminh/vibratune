import TrackPlayer, { 
  Capability,
  Event,
  AppKilledPlaybackBehavior
} from 'react-native-track-player';

export interface Track {
  id: string;
  url: string;
  title: string;
  artist: string;
  artwork: string;
}

// Initialize the player with basic setup
export async function setupPlayer() {
  let isSetup = false;
  try {
    // Check if player is already initialized
    await TrackPlayer.getActiveTrackIndex();
    isSetup = true;
  } catch {
    // Initialize the player if it hasn't been
    await TrackPlayer.setupPlayer();
    
    // Add basic capabilities that our app needs
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
  }
  return isSetup;
}

// Add a single track and play it
export async function addTrack(track: Track) {
  await TrackPlayer.add([{
    id: track.id,
    url: track.url,
    title: track.title,
    artist: track.artist,
    artwork: track.artwork,
  }]);
}

// Play a specific track
export async function playTrack(track: Track) {
  try {
    await TrackPlayer.reset();
    await addTrack(track);
    await TrackPlayer.play();
  } catch (error) {
    console.log('Error playing track:', error);
  }
}

// Basic playback controls
export const playbackControls = {
  play: async () => await TrackPlayer.play(),
  pause: async () => await TrackPlayer.pause(),
  stop: async () => await TrackPlayer.stop(),
  next: async () => await TrackPlayer.skipToNext(),
  previous: async () => await TrackPlayer.skipToPrevious(),
  seek: async (position: number) => await TrackPlayer.seekTo(position),
}; 