"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  FileText,
  Menu,
  MessageSquare,
  Search,
  Users,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DarkMode } from "./dark-mode";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex flex-shrink-0 items-center">
              <span className="text-2xl font-bold">TechCorp Connect</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/directory">
                  <Users className="mr-2 h-4 w-4" />
                  Directorio
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/messages">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Mensajes
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/documents">
                  <FileText className="mr-2 h-4 w-4" />
                  Documentos
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                />
              </div>
            </div>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="@usuario"
              />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>

            <DarkMode />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">Menu</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </div>
                  <div className="relative ml-auto flex-1 md:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar..."
                      className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                    />
                  </div>

                  <Button variant="ghost" asChild className="justify-start">
                    <Link href="/directory" onClick={() => setIsOpen(false)}>
                      <Users className="mr-2 h-4 w-4" />
                      Directorio
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild className="justify-start">
                    <Link href="/messages" onClick={() => setIsOpen(false)}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Mensajes
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild className="justify-start">
                    <Link href="/documents" onClick={() => setIsOpen(false)}>
                      <FileText className="mr-2 h-4 w-4" />
                      Documentos
                    </Link>
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    <Bell className="mr-2 h-4 w-4" />
                    Notificaciones
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
