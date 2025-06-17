import React, { createContext, useContext, useState, ReactNode } from "react";

interface Album {
  id: string;
  title: string;
  artist: string;
  imageUrl?: string | null;
}

interface AlbumSavedContextType {
  savedAlbums: Album[];
  saveAlbum: (album: Album) => void;
  unsaveAlbum: (albumId: string) => void;
  isAlbumSaved: (albumId: string) => boolean;
}

const AlbumSavedContext = createContext<AlbumSavedContextType | undefined>(
  undefined
);

interface AlbumSavedProviderProps {
  children: ReactNode;
}

export const AlbumSavedProvider: React.FC<AlbumSavedProviderProps> = ({
  children,
}) => {
  const [savedAlbums, setSavedAlbums] = useState<Album[]>([]);

  const saveAlbum = (album: Album) => {
    setSavedAlbums((prev) => {
      if (!prev.some((a) => a.id === album.id)) {
        return [...prev, album];
      }
      return prev;
    });
  };

  const unsaveAlbum = (albumId: string) => {
    setSavedAlbums((prev) => prev.filter((album) => album.id !== albumId));
  };

  const isAlbumSaved = (albumId: string) => {
    return savedAlbums.some((album) => album.id === albumId);
  };

  return (
    <AlbumSavedContext.Provider
      value={{ savedAlbums, saveAlbum, unsaveAlbum, isAlbumSaved }}
    >
      {children}
    </AlbumSavedContext.Provider>
  );
};

export const useAlbumSaved = () => {
  const context = useContext(AlbumSavedContext);
  if (context === undefined) {
    throw new Error("useAlbumSaved must be used within a AlbumSavedProvider");
  }
  return context;
};
