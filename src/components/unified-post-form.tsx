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

type UnifiedPostFormProps = {
  onRegularPostSubmit: (post: RegularPost) => void;
  onLinkedInPostSubmit: (post: LinkedInPost) => void;
  currentUser: {
    name: string;
    department: string;
    hasSpecialPostPermission: boolean;
    isRecruiter: boolean;
  };
};

export default function UnifiedPostForm({
  onRegularPostSubmit,
  onLinkedInPostSubmit,
  currentUser,
}: Readonly<UnifiedPostFormProps>) {
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

    const post: RegularPost = {
      id: Date.now().toString(),
      author: currentUser.name,
      department: currentUser.department,
      content: regularPost.content,
      type: regularPost.type as "normal" | "special",
      title: regularPost.type === "special" ? regularPost.title : undefined,
      postedAt: new Date().toISOString(),
    };

    onRegularPostSubmit(post);
    setRegularPost({ content: "", type: "normal", title: "" });
  };

  const handleLinkedInPostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkedInPost.content || !linkedInPost.linkedinUrl) return;

    const post: LinkedInPost = {
      id: Date.now().toString(),
      author: currentUser.name,
      department: currentUser.department,
      content: linkedInPost.content,
      linkedinUrl: linkedInPost.linkedinUrl,
      internalLikes: 0,
      postedAt: new Date().toISOString(),
    };

    onLinkedInPostSubmit(post);
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
                placeholder="¿Qué está pasando en TechCorp?"
                value={regularPost.content}
                onChange={(e) =>
                  setRegularPost({ ...regularPost, content: e.target.value })
                }
                className="mb-2"
              />
              <div className="flex justify-between items-center mt-2">
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
