import React, { createContext, useContext, useState, ReactNode } from "react";
import { TopTrack } from "../types/type";

// interface Track {
//   id: string;
//   title: string;
//   artist: string;
//   imageUrl: string;
//   duration?: string;
// }

interface TrackFavouriteContextType {
  favourites: TopTrack[];
  addToFavourites: (track: TopTrack) => void;
  removeFromFavourites: (trackId: number) => void;
  isFavourite: (trackId: number) => boolean;
}

const TrackFavouriteContext = createContext<
  TrackFavouriteContextType | undefined
>(undefined);

interface TrackFavouriteProviderProps {
  children: ReactNode;
}

export const TrackFavouriteProvider: React.FC<TrackFavouriteProviderProps> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<TopTrack[]>([]);

  const addToFavourites = (track: TopTrack) => {
    setFavourites((prev) => {
      // Check if track is already in favorites
      if (!prev.some((t) => t.id === track.id)) {
        return [...prev, track];
      }
      return prev;
    });
  };

  const removeFromFavourites = (trackId: number) => {
    setFavourites((prev) => prev.filter((track) => track.id !== trackId));
  };

  const isFavourite = (trackId: number) => {
    return favourites.some((track) => track.id === trackId);
  };

  return (
    <TrackFavouriteContext.Provider
      value={{ favourites, addToFavourites, removeFromFavourites, isFavourite }}
    >
      {children}
    </TrackFavouriteContext.Provider>
  );
};

export const useTrackFavourites = () => {
  const context = useContext(TrackFavouriteContext);
  if (context === undefined) {
    throw new Error(
      "useTrackFavourites must be used within a TrackFavouriteProvider"
    );
  }
  return context;
};
