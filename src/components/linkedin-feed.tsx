"use client";

import { useState, useEffect } from "react";
import { ThumbsUp, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type LinkedInPost = {
  id: string;
  author: string;
  department: string;
  content: string;
  linkedinUrl: string;
  internalLikes: number;
  postedAt: string;
};

export default function LinkedInFeed() {
  const [posts, setPosts] = useState<LinkedInPost[]>([]);

  useEffect(() => {
    // Simular carga de posts desde el backend
    setPosts([
      {
        id: "1",
        author: "Hernan Vietto",
        department: "Recruiting",
        content:
          "Mientras se acomodan para un gran Viernes, se pasan por el Link y apoyan a Vietto",
        linkedinUrl:
          "https://www.linkedin.com/feed/update/urn:li:activity:7245225053158559746/",
        internalLikes: 5,
        postedAt: "2023-09-26T21:28:00Z",
      },
      {
        id: "2",
        author: "Ana Martínez",
        department: "Recruiting",
        content:
          "¡Nueva oportunidad de trabajo en nuestra empresa! Compartan con sus contactos.",
        linkedinUrl: "https://www.linkedin.com/post/example-url-2",
        internalLikes: 3,
        postedAt: "2023-09-26T20:15:00Z",
      },
    ]);
  }, []);

  const handleLike = (id: string) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, internalLikes: post.internalLikes + 1 }
          : post
      )
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      {posts.map((post) => (
        <Card key={post.id} className="mb-4">
          <CardContent className="pt-4">
            <div className="flex items-start mb-2">
              <Avatar className="mr-2">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt={post.author}
                />
                <AvatarFallback>{post.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">{post.author}</p>
                <p className="text-xs text-gray-500">{post.department}</p>
              </div>
            </div>
            <p className="text-sm mb-2">{post.content}</p>
            <div className="flex flex-col space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => window.open(post.linkedinUrl, "_blank")}
              >
                <ExternalLink className="mr-2 h-3 w-3" />
                Ver en LinkedIn
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => handleLike(post.id)}
              >
                <ThumbsUp className="mr-2 h-3 w-3" />
                Apoyar ({post.internalLikes})
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {formatDate(post.postedAt)}
            </p>
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  );
}
