"use client";

import { useState, useEffect } from "react";
import { Film, ThumbsUp, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Movie = {
  id: string;
  title: string;
  proposedBy: string;
  votes: number;
  trailerUrl: string;
  voters: string[];
};

export default function FilmViernes({
  mockIsToday,
  mockIsVotingClosed,
}: Readonly<{
  mockIsToday: boolean;
  mockIsVotingClosed: boolean;
}>) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovie, setNewMovie] = useState({ title: "", trailerUrl: "" });
  const [theme, setTheme] = useState("Ciencia Ficción");
  const [isToday, setIsToday] = useState(false);
  const [isVotingClosed, setIsVotingClosed] = useState(false);
  const [currentUser] = useState("Usuario Actual"); // This should be the logged-in user

  useEffect(() => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // setIsToday(dayOfWeek === 5); // 5 represents Friday
    // setIsVotingClosed(hours > 14 || (hours === 14 && minutes >= 0));
    setIsToday(mockIsToday);
    setIsVotingClosed(mockIsVotingClosed);

    setTheme("Ciencia Ficción"); // This should be determined by the backend

    // Here you would normally load movies from your backend
    setMovies([
      {
        id: "1",
        title: "The Shawshank Redemption",
        proposedBy: "Ana",
        votes: 5,
        trailerUrl: "https://www.youtube.com/embed/6hB3S9bIaco",
        voters: ["User1", "User2", "User3", "User4", "User5"],
      },
      {
        id: "2",
        title: "Inception",
        proposedBy: "Carlos",
        votes: 3,
        trailerUrl: "https://www.youtube.com/embed/YoHD9XEInc0",
        voters: ["User6", "User7", "User8"],
      },
      {
        id: "3",
        title: "Interstellar",
        proposedBy: "Marta",
        votes: 2,
        trailerUrl: "https://www.youtube.com/embed/zSWdZVtXT7E",
        voters: ["User9", "User10"],
      },
      {
        id: "4",
        title: "The Matrix",
        proposedBy: "Juan",
        votes: 1,
        trailerUrl: "https://www.youtube.com/embed/m8e-FF8MsqU",
        voters: ["User11"],
      },
      {
        id: "5",
        title: "Blade Runner",
        proposedBy: "Pedro",
        votes: 0,
        trailerUrl: "https://www.youtube.com/embed/eogpIG53Cis",
        voters: [],
      }
    ]);
  }, []);

  const handleAddMovie = () => {
    if (isVotingClosed) return;

    const movie: Movie = {
      id: Date.now().toString(),
      title: newMovie.title,
      proposedBy: currentUser,
      votes: 0,
      trailerUrl: newMovie.trailerUrl,
      voters: [],
    };
    setMovies([...movies, movie]);
    setNewMovie({ title: "", trailerUrl: "" });
  };

  const handleVote = (id: string) => {
    if (isVotingClosed) return;

    setMovies(
      movies.map((movie) => {
        if (movie.id === id && !movie.voters.includes(currentUser)) {
          return {
            ...movie,
            votes: movie.votes + 1,
            voters: [...movie.voters, currentUser],
          };
        }
        return movie;
      }),
    );
  };

  const sortedMovies = [...movies].sort((a, b) => b.votes - a.votes);
  const topMovies = isVotingClosed ? sortedMovies.slice(0, 5) : sortedMovies;

  if (!isToday) return null;

  return (
    <Card className="mb-6 bg-gradient-to-r from-purple-600 to-indigo-800 text-white">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-bold">
          <Film className="mr-2 h-8 w-8" />
          FilmViernes
        </CardTitle>
        <p className="text-sm">Especial: {theme}</p>
      </CardHeader>
      <CardContent>
        {!isVotingClosed && (
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Título de la película"
              value={newMovie.title}
              onChange={(e) =>
                setNewMovie({ ...newMovie, title: e.target.value })
              }
              className="mb-2"
            />
            <Input
              type="text"
              placeholder="URL del trailer (YouTube)"
              value={newMovie.trailerUrl}
              onChange={(e) =>
                setNewMovie({ ...newMovie, trailerUrl: e.target.value })
              }
              className="mb-2"
            />
            <Button onClick={handleAddMovie} className="w-full">
              Proponer Película
            </Button>
          </div>
        )}
        {isVotingClosed && (
          <div className="mb-4 text-center">
            <h3 className="text-xl font-bold">¡Votación cerrada!</h3>
            <p>Estas son las películas ganadoras de hoy:</p>
          </div>
        )}
        <ScrollArea className="h-[300px] w-full rounded-md p-4">
          {topMovies.map((movie, index) => (
            <div key={movie.id} className="mb-4 rounded-lg bg-indigo-700 p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    {index + 1}. {movie.title}
                  </p>
                  <p className="text-sm">Propuesto por: {movie.proposedBy}</p>
                </div>
                <div className="flex items-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Play className="mr-1 h-4 w-4" />
                        Ver trailer
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>{movie.title}</DialogTitle>
                      </DialogHeader>
                      <div className="aspect-video">
                        <iframe
                          width="100%"
                          height="100%"
                          src={movie.trailerUrl}
                          title={`${movie.title} trailer`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVote(movie.id)}
                    disabled={
                      isVotingClosed || movie.voters.includes(currentUser)
                    }
                  >
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    {movie.votes}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
