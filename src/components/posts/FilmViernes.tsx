"use client";

import { useState, useEffect } from "react";
import { Film, ThumbsUp, Play, List } from "lucide-react";
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
};

export default function FilmViernes() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovie, setNewMovie] = useState({ title: "", trailerUrl: "" });
  const [theme, setTheme] = useState("Ciencia Ficción");
  const [isToday, setIsToday] = useState(true); // Esto debería ser determinado por el backend

  useEffect(() => {
    setIsToday(true); // Esto debería ser determinado por el backend

    setTheme("Ciencia Ficción"); // Esto debería ser determinado por el backend

    // Aquí normalmente cargarías las películas desde el backend
    // Por ahora, usaremos datos de ejemplo
    setMovies([
      {
        id: "1",
        title: "Blade Runner 2049",
        proposedBy: "Ana",
        votes: 5,
        trailerUrl: "https://www.youtube.com/embed/gCcx85zbxz4",
      },
      {
        id: "2",
        title: "Inception",
        proposedBy: "Carlos",
        votes: 3,
        trailerUrl: "https://www.youtube.com/embed/YoHD9XEInc0",
      },
    ]);
  }, []);

  const handleAddMovie = () => {
    const movie: Movie = {
      id: Date.now().toString(),
      title: newMovie.title,
      proposedBy: "Usuario Actual", // Esto debería ser el usuario logueado
      votes: 0,
      trailerUrl: newMovie.trailerUrl,
    };
    setMovies([...movies, movie]);
    setNewMovie({ title: "", trailerUrl: "" });
  };

  const handleVote = (id: string) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, votes: movie.votes + 1 } : movie
      )
    );
  };

  const sortedMovies = [...movies].sort((a, b) => b.votes - a.votes);

  const generatePlaylist = () => {
    const topMovies = sortedMovies
      .slice(0, 5)
      .map((movie) => movie.title)
      .join(", ");
    alert(
      `Lista de reproducción generada con las películas más votadas: ${topMovies}`
    );
  };

  if (!isToday) return null;

  return (
    <Card className="mb-6 bg-gradient-to-r from-purple-600 to-indigo-800 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <Film className="mr-2 h-8 w-8" />
          FilmViernes
        </CardTitle>
        <p className="text-sm">Especial: {theme}</p>
      </CardHeader>
      <CardContent>
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
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {sortedMovies.map((movie, index) => (
            <div key={movie.id} className="mb-4 p-2 bg-indigo-700 rounded-lg">
              <div className="flex justify-between items-center">
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
                        <Play className="h-4 w-4 mr-1" />
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
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {movie.votes}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
        <Button onClick={generatePlaylist} className="w-full mt-4">
          <List className="mr-2 h-4 w-4" />
          Generar Lista de Reproducción
        </Button>
      </CardContent>
    </Card>
  );
}
