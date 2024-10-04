'use client'

import { useState } from 'react'
import { Linkedin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type LinkedInPost = {
  id: string
  author: string
  department: string
  content: string
  linkedinUrl: string
  internalLikes: number
  postedAt: string
}

export default function LinkedInPostForm({ onPostSubmit }: Readonly<{ onPostSubmit: (post: LinkedInPost) => void }>) {
  const [newPost, setNewPost] = useState({ content: '', linkedinUrl: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.content || !newPost.linkedinUrl) return

    const post: LinkedInPost = {
      id: Date.now().toString(),
      author: 'Recruiter Name', // This should be dynamically set based on the logged-in user
      department: 'Recruiting',
      content: newPost.content,
      linkedinUrl: newPost.linkedinUrl,
      internalLikes: 0,
      postedAt: new Date().toISOString()
    }

    onPostSubmit(post)
    setNewPost({ content: '', linkedinUrl: '' })
  }

  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <Linkedin className="mr-2 h-8 w-8" />
          Compartir Publicación de LinkedIn
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Textarea
            placeholder="Describe la publicación de LinkedIn"
            value={newPost.content}
            onChange={(e) => setNewPost({...newPost, content: e.target.value})}
            className="mb-2"
          />
          <Input
            type="url"
            placeholder="URL de la publicación de LinkedIn"
            value={newPost.linkedinUrl}
            onChange={(e) => setNewPost({...newPost, linkedinUrl: e.target.value})}
            className="mb-2"
          />
          <Button type="submit" className="w-full">Compartir Publicación</Button>
        </form>
      </CardContent>
    </Card>
  )
}