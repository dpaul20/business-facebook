"use client";

import { useState } from "react";
import { Linkedin, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type LinkedInPost = {
  id: string;
  author: string;
  department: string;
  content: string;
  linkedinUrl: string;
  internalLikes: number;
  postedAt: string;
};

export type RegularPost = {
  id: string;
  author: string;
  department: string;
  content: string;
  type: "normal" | "special";
  title?: string;
  postedAt: string;
};

// Simulación de un usuario con permisos especiales
const currentUser = {
  name: "Juan Pérez",
  department: "Tecnología",
  hasSpecialPostPermission: true,
  isRecruiter: true, // Set this to true for recruiters, false for regular employees
};

export default function UnifiedPostForm() {
  const [regularPost, setRegularPost] = useState({
    content: "",
    type: "normal",
    title: "",
  });
  const [linkedInPost, setLinkedInPost] = useState({
    content: "",
    linkedinUrl: "",
  });

  const handleRegularPostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regularPost.content) return;

    // onRegularPostSubmit(post);
    setRegularPost({ content: "", type: "normal", title: "" });
  };

  const handleLinkedInPostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkedInPost.content || !linkedInPost.linkedinUrl) return;

    // onLinkedInPostSubmit(post);
    setLinkedInPost({ content: "", linkedinUrl: "" });
  };

  return (
    <Card className="mb-6">
      <Tabs defaultValue="regular" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="regular">Publicación Regular</TabsTrigger>
          {currentUser.isRecruiter && (
            <TabsTrigger value="linkedin">Compartir LinkedIn</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="regular">
          <CardContent>
            <form onSubmit={handleRegularPostSubmit}>
              {currentUser.hasSpecialPostPermission && (
                <Select
                  value={regularPost.type}
                  onValueChange={(value) =>
                    setRegularPost({ ...regularPost, type: value })
                  }
                >
                  <SelectTrigger className="mb-2">
                    <SelectValue placeholder="Tipo de publicación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Publicación normal</SelectItem>
                    <SelectItem value="special">
                      Publicación especial
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
              {regularPost.type === "special" && (
                <Input
                  type="text"
                  placeholder="Título de la publicación especial"
                  value={regularPost.title}
                  onChange={(e) =>
                    setRegularPost({ ...regularPost, title: e.target.value })
                  }
                  className="mb-2"
                />
              )}
              <Textarea
                placeholder="¿Qué está pasando en Darwoft?"
                value={regularPost.content}
                onChange={(e) =>
                  setRegularPost({ ...regularPost, content: e.target.value })
                }
                className="mb-2"
              />
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mr-2"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Adjuntar
                  </Button>
                  <Button type="button" variant="outline" size="sm">
                    <Users className="mr-2 h-4 w-4" />
                    Mencionar
                  </Button>
                </div>
                <Button type="submit">Publicar</Button>
              </div>
            </form>
          </CardContent>
        </TabsContent>
        {currentUser.isRecruiter && (
          <TabsContent value="linkedin">
            <CardContent>
              <form onSubmit={handleLinkedInPostSubmit}>
                <Textarea
                  placeholder="Describe la publicación de LinkedIn"
                  value={linkedInPost.content}
                  onChange={(e) =>
                    setLinkedInPost({
                      ...linkedInPost,
                      content: e.target.value,
                    })
                  }
                  className="mb-2"
                />
                <Input
                  type="url"
                  placeholder="URL de la publicación de LinkedIn"
                  value={linkedInPost.linkedinUrl}
                  onChange={(e) =>
                    setLinkedInPost({
                      ...linkedInPost,
                      linkedinUrl: e.target.value,
                    })
                  }
                  className="mb-2"
                />
                <Button type="submit" className="w-full">
                  <Linkedin className="mr-2 h-4 w-4" />
                  Compartir Publicación de LinkedIn
                </Button>
              </form>
            </CardContent>
          </TabsContent>
        )}
      </Tabs>
    </Card>
  );
}
