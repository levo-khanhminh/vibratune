import React, { createContext, useContext, useState, ReactNode } from "react";

interface Playlist {
  id: string;
  title: string;
  creator: string;
  imageUrl: string;
  trackCount?: number;
  duration?: string;
}

interface PlaylistSavedContextType {
  savedPlaylists: Playlist[];
  savePlaylist: (playlist: Playlist) => void;
  unsavePlaylist: (playlistId: string) => void;
  isPlaylistSaved: (playlistId: string) => boolean;
}

const PlaylistSavedContext = createContext<
  PlaylistSavedContextType | undefined
>(undefined);

interface PlaylistSavedProviderProps {
  children: ReactNode;
}

export const PlaylistSavedProvider: React.FC<PlaylistSavedProviderProps> = ({
  children,
}) => {
  const [savedPlaylists, setSavedPlaylists] = useState<Playlist[]>([]);

  const savePlaylist = (playlist: Playlist) => {
    setSavedPlaylists((prev) => {
      if (!prev.some((p) => p.id === playlist.id)) {
        return [...prev, playlist];
      }
      return prev;
    });
  };

  const unsavePlaylist = (playlistId: string) => {
    setSavedPlaylists((prev) =>
      prev.filter((playlist) => playlist.id !== playlistId)
    );
  };

  const isPlaylistSaved = (playlistId: string) => {
    return savedPlaylists.some((playlist) => playlist.id === playlistId);
  };

  return (
    <PlaylistSavedContext.Provider
      value={{ savedPlaylists, savePlaylist, unsavePlaylist, isPlaylistSaved }}
    >
      {children}
    </PlaylistSavedContext.Provider>
  );
};

export const usePlaylistSaved = () => {
  const context = useContext(PlaylistSavedContext);
  if (context === undefined) {
    throw new Error(
      "usePlaylistSaved must be used within a PlaylistSavedProvider"
    );
  }
  return context;
};
