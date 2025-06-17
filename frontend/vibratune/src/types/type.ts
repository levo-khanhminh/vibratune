export type TopArtist = {
  id: number;
  name: string;
  bigPictureUrl: string;
  mediumPictureUrl: string;
  smallPictureUrl: string;
  numberOfFans: number;
  monthlyListeners: number;
};
export type TopTrack = {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  coverImageUrl: string;
  trackUrl: string;
  lyrics: string;
  duration: number;
  trackRank: number;
  trackPreviewUrl: string;
  artist: TopArtist;
};

export type Genre = {
  id: number;
  name: string;
  bigPicture: string;
  mediumPicture: string;
  smallPicture: string;
  color1?: string;
  color2?: string;
};
export type Album = {
  id: number;
  name: string;
  description: string;
  releaseDate: Date;
  bigCoverImageUrl: string;
  smallCoverImageUrl: string;
  mediumCoverImageUrl: string;
  artist: TopArtist;
  genre: Genre;
  tracks: TopTrack[];
};

export type DetailArtist = {
  id: number;
  name: string;
  bigPictureUrl: string;
  mediumPictureUrl: string;
  smallPictureUrl: string;
  numberOfFans: number;
  monthlyListeners: number;
  tracks: TopTrack[];
  albums: Album[];
};
