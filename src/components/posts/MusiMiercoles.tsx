"use client";

import { useState, useEffect } from "react";
import { Music, ThumbsUp, Youtube, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

type Song = {
  id: string;
  title: string;
  artist: string;
  proposedBy: string;
  platform: "spotify" | "youtube";
  reactions: number;
};

export default function MusiMiercoles() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [newSong, setNewSong] = useState({ title: "", artist: "", url: "" });
  const [isToday, setIsToday] = useState(true); // This should be determined by your backend

  useEffect(() => {
    setIsToday(true); // This should be determined by your backend
    // Aquí normalmente cargarías las canciones desde tu backend
    // Por ahora, usaremos datos de ejemplo
    setSongs([
      {
        id: "1",
        title: "Bohemian Rhapsody",
        artist: "Queen",
        proposedBy: "Ana",
        platform: "spotify",
        reactions: 5,
      },
      {
        id: "2",
        title: "Imagine",
        artist: "John Lennon",
        proposedBy: "Carlos",
        platform: "youtube",
        reactions: 3,
      },
    ]);
  }, []);

  const handleAddSong = () => {
    const platform = newSong.url.includes("youtube") ? "youtube" : "spotify";
    const song: Song = {
      id: Date.now().toString(),
      title: newSong.title,
      artist: newSong.artist,
      proposedBy: "Usuario Actual", // Esto debería ser el usuario logueado
      platform,
      reactions: 0,
    };
    setSongs([...songs, song]);
    setNewSong({ title: "", artist: "", url: "" });
  };

  const handleReaction = (id: string) => {
    setSongs(
      songs.map((song) =>
        song.id === id ? { ...song, reactions: song.reactions + 1 } : song,
      ),
    );
  };

  const sortedSongs = [...songs].sort((a, b) => b.reactions - a.reactions);

  if (!isToday) return null;

  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-bold">
          <Music className="mr-2 h-8 w-8" />
          MusiMiércoles
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Título de la canción"
            value={newSong.title}
            onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
            className="mb-2"
          />
          <Input
            type="text"
            placeholder="Artista"
            value={newSong.artist}
            onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
            className="mb-2"
          />
          <Input
            type="text"
            placeholder="URL de Spotify o YouTube"
            value={newSong.url}
            onChange={(e) => setNewSong({ ...newSong, url: e.target.value })}
            className="mb-2"
          />
          <Button onClick={handleAddSong} className="w-full">
            Proponer Canción
          </Button>
        </div>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {sortedSongs.map((song, index) => (
            <div key={song.id} className="mb-4 rounded-lg bg-blue-700 p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    {index + 1}. {song.title}
                  </p>
                  <p className="text-sm">{song.artist}</p>
                </div>
                <div className="flex items-center">
                  {song.platform === "spotify" ? (
                    <Headphones className="mr-2 h-4 w-4" />
                  ) : (
                    <Youtube className="mr-2 h-4 w-4" />
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleReaction(song.id)}
                  >
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    {song.reactions}
                  </Button>
                </div>
              </div>
              <div className="mt-2 text-xs">
                Propuesto por: {song.proposedBy}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
