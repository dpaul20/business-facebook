"use client";
import { useState } from "react";
import CakeSelector from "./CakeSelector";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export default function BirthdayPost() {
  const [cakeCount, setCakeCount] = useState<{ [key: string]: number }>({
    "🎂": 0,
    "🧁": 0,
    "🍰": 0,
    "🍥": 0,
    "🥮": 0,
    "🍮": 0,
  });
  const handleCakeSelect = (cake: string) => {
    setCakeCount((prevCount) => ({
      ...prevCount,
      [cake]: prevCount[cake] + 1,
    }));
  };
  return (
    <Card className="mb-4 bg-gradient-to-r from-pink-100 to-blue-100 dark:from-pink-900 dark:to-blue-900">
      <CardHeader>
        <div className="flex items-center">
          <Avatar className="mr-2">
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="@usuario"
            />
            <AvatarFallback>LC</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-sm font-semibold">
              ¡Feliz Cumpleaños, Laura Castro! 🎉
            </CardTitle>
            <p className="text-xs text-muted-foreground">Diseñadora UX • Hoy</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-lg">
          Hoy es el cumpleaños de nuestra talentosa diseñadora. ¡Celebremos
          enviando pasteles virtuales! 🥳
        </p>
        <CakeSelector onSelect={handleCakeSelect} />
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(cakeCount).map(
            ([cake, count]) =>
              count > 0 && (
                <span
                  key={cake}
                  className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-gray-700"
                >
                  {cake} x {count}
                </span>
              ),
          )}
        </div>
      </CardContent>
    </Card>
  );
}
