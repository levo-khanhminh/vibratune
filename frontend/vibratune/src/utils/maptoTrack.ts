import { Track } from "react-native-track-player";
import { TopTrack } from "../types/type";
function getRandomNumber(): number {
  return Math.floor(Math.random() * 26) + 1;
}
export function mapToTrack(track: TopTrack): Track {
  const { id, title, duration, artist } = track;
  const trackData = {
    id: id,
    title: title,
    artist: artist.name,
    url: `https://d15dozolzarq2g.cloudfront.net/audio_${getRandomNumber().toString()}.mp3`,
    artwork: artist.mediumPictureUrl,
  };
  return trackData;
}
