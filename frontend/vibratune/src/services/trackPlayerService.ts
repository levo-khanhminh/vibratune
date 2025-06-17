import TrackPlayer, {
  Capability,
  Event,
  AppKilledPlaybackBehavior,
  Track,
} from "react-native-track-player";

let isSetup = false;
// Initialize the player with basic setup
export async function setupPlayer() {
  if (isSetup) return;
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
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
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
  await TrackPlayer.add([track]);
}
export async function playRandomTrack(track: Track) {
  try {
    const tracks = await TrackPlayer.getQueue();
    await TrackPlayer.setQueue([track, ...tracks]);
    // console.log("PLaying a random track");
    // await TrackPlayer.add(track, 1);
    // console.log("Add successfully");
    await TrackPlayer.play();
    console.log("Play successfully");
  } catch (error: any) {
    console.log(error.message);
  }
}
export async function playAlbumTracks(tracks: Track[]) {
  await TrackPlayer.reset();
  await TrackPlayer.setQueue(tracks);
  await TrackPlayer.play();
}
// Play a specific track
export async function playTrack(track: Track) {
  try {
    console.log(track);
    await TrackPlayer.reset();
    await addTrack(track);
    await TrackPlayer.play();
  } catch (error) {
    console.log("Error playing track:", error);
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
