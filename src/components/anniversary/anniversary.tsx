"use client";
import { useState, useMemo } from "react";
import Qualities from "./qualities";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

type Quality = {
  emoji: string;
  quality: string;
};

type GroupedQuality = Quality & { count: number };

export default function Anniversary() {
  const [qualities, setQualities] = useState<Quality[]>([]);
  const [votedEmojis, setVotedEmojis] = useState<Set<string>>(new Set());
  const [isOpen, setIsOpen] = useState(false);

  const handleQualities = (quality: Quality) => {
    if (!votedEmojis.has(quality.emoji)) {
      setQualities((prevQualities) => [...prevQualities, quality]);
      setVotedEmojis((prevVoted) => new Set(prevVoted).add(quality.emoji));
    }
  };

  const groupedQualities = useMemo(() => {
    const grouped = qualities.reduce((acc, quality) => {
      const existingQuality = acc.find((q) => q.emoji === quality.emoji);
      if (existingQuality) {
        existingQuality.count += 1;
      } else {
        acc.push({ ...quality, count: 1 });
      }
      return acc;
    }, [] as GroupedQuality[]);

    return grouped.sort((a, b) => b.count - a.count);
  }, [qualities]);

  return (
    <Card className="mb-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
      <CardHeader>
        <div className="flex items-center">
          <Avatar className="mr-2">
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="@usuario"
            />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-sm font-semibold">
              ¡5º Aniversario de Ana Martínez en Darwoft! 🎉
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Analista de Datos • 5 años en la empresa
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-lg">
          Celebremos los 5 años de Ana en Darwoft colocando emoji para reconocer
          cualidades o logros.
        </p>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="mb-4 w-full">
              {isOpen ? "Ocultar cualidades" : "Mostrar cualidades"}
              {isOpen ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Qualities onPlant={handleQualities} votedEmojis={votedEmojis} />
          </CollapsibleContent>
        </Collapsible>
        {groupedQualities.length > 0 && (
          <div className="mt-6">
            <h4 className="mb-2 text-lg font-semibold">
              Cualidades reconocidas por la comunidad
            </h4>
            <ScrollArea className="w-full rounded-md border">
              <div className="flex flex-wrap items-center gap-2 p-4">
                {groupedQualities.map((quality, index) => (
                  <div
                    key={index}
                    className="flex items-center rounded-full bg-white px-3 py-1 text-sm font-semibold text-gray-700 shadow"
                    title={quality.quality}
                  >
                    <span className="mr-2 text-2xl">{quality.emoji}</span>
                    <span>x {quality.count}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
