"use client";

import { useState, useEffect } from "react";
import { Music, ThumbsUp, Youtube, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import MediaEmbed from "./MediaEmbed";

type Song = {
  id: string;
  title: string;
  artist: string;
  proposedBy: string;
  platform: "spotify" | "youtube";
  reactions: number;
  url: string;
  voters: string[];
};

export default function MusiMiercoles({
  mockIsToday,
  mockIsVotingClosed,
}: Readonly<{
  mockIsToday: boolean;
  mockIsVotingClosed: boolean;
}>) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [newSong, setNewSong] = useState({ title: "", artist: "", url: "" });
  const [isToday, setIsToday] = useState(true);
  const [isVotingClosed, setIsVotingClosed] = useState(false);
  const [currentUser] = useState("Usuario Actual"); // This should be the logged-in user

  useEffect(() => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // setIsToday(dayOfWeek === 3); // 3 represents Wednesday
    // setIsVotingClosed(hours > 14 || (hours === 14 && minutes >= 0));
    setIsToday(mockIsToday);
    setIsVotingClosed(mockIsVotingClosed);

    // Aquí normalmente cargarías las canciones desde tu backend
    setSongs([
      {
        id: "1",
        title: "Bohemian Rhapsody",
        artist: "Queen",
        proposedBy: "Ana",
        platform: "spotify",
        reactions: 5,
        url: "https://open.spotify.com/track/3z8h0TU7ReDPLIbEnYhWZb",
        voters: ["User1", "User2", "User3", "User4", "User5"],
      },
      {
        id: "2",
        title: "Imagine",
        artist: "John Lennon",
        proposedBy: "Carlos",
        platform: "youtube",
        reactions: 3,
        url: "https://www.youtube.com/watch?v=YkgkThdzX-8",
        voters: ["User6", "User7", "User8"],
      },
      {
        id: "3",
        title: "Hotel California",
        artist: "Eagles",
        proposedBy: "Pedro",
        platform: "spotify",
        reactions: 2,
        url: "https://open.spotify.com/track/40riOy7x9W7GXjyGp4pjAv",
        voters: ["User9", "User10"],
      }
    ]);
  }, []);

  const handleAddSong = () => {
    if (isVotingClosed) return;

    const platform = newSong.url.includes("youtube") ? "youtube" : "spotify";
    const song: Song = {
      id: Date.now().toString(),
      title: newSong.title,
      artist: newSong.artist,
      proposedBy: currentUser,
      platform,
      reactions: 0,
      url: newSong.url,
      voters: [],
    };
    setSongs([...songs, song]);
    setNewSong({ title: "", artist: "", url: "" });
  };

  const handleReaction = (id: string) => {
    if (isVotingClosed) return;

    setSongs(
      songs.map((song) => {
        if (song.id === id && !song.voters.includes(currentUser)) {
          return {
            ...song,
            reactions: song.reactions + 1,
            voters: [...song.voters, currentUser],
          };
        }
        return song;
      }),
    );
  };

  const sortedSongs = [...songs].sort((a, b) => b.reactions - a.reactions);
  const topSongs = isVotingClosed ? sortedSongs.slice(0, 3) : sortedSongs;

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
        {!isVotingClosed && (
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Título de la canción"
              value={newSong.title}
              onChange={(e) =>
                setNewSong({ ...newSong, title: e.target.value })
              }
              className="mb-2"
            />
            <Input
              type="text"
              placeholder="Artista"
              value={newSong.artist}
              onChange={(e) =>
                setNewSong({ ...newSong, artist: e.target.value })
              }
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
        )}
        {isVotingClosed && (
          <div className="mb-4 text-center">
            <h3 className="text-xl font-bold">¡Votación cerrada!</h3>
            <p>Estas son las canciones ganadoras de hoy:</p>
          </div>
        )}
        <ScrollArea className="h-[300px] w-full rounded-md p-4">
          {topSongs.map((song, index) => (
            <div key={song.id} className="mb-4 rounded-lg bg-blue-700 p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">
                    {index + 1}. {song.title} - {song.artist}
                  </p>
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
                    disabled={
                      isVotingClosed || song.voters.includes(currentUser)
                    }
                  >
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    {song.reactions}
                  </Button>
                </div>
              </div>
              <div className="mt-2 text-xs">
                Propuesto por: {song.proposedBy}
              </div>
              <div className="mt-2">
                <MediaEmbed url={song.url} />
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
