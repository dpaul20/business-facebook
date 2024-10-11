"use client";
import { useState } from "react";
import AchievementGarden from "./AchievementGarden";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export default function Anniversary() {
  const [plantedFlowers, setPlantedFlowers] = useState<
    { emoji: string; quality: string }[]
  >([]);

  const handlePlantFlower = (flower: { emoji: string; quality: string }) => {
    setPlantedFlowers((prevFlowers) => [...prevFlowers, flower]);
  };
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
              ¡5º Aniversario de Ana Martínez en TechCorp! 🎉
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Analista de Datos • 5 años en la empresa
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-lg">
          Celebremos los 5 años de Ana en TechCorp plantando flores en su Jardín
          de Logros virtual. Cada flor representa una cualidad o logro de Ana.
        </p>
        <AchievementGarden onPlant={handlePlantFlower} />
        <div className="mt-6">
          <h4 className="mb-2 text-lg font-semibold">
            Jardín de Logros de Ana
          </h4>
          <div className="flex min-h-[100px] flex-wrap items-end rounded-lg bg-green-50 p-4">
            {plantedFlowers.map((flower, index) => (
              <div
                key={index}
                className="animate-grow-up mb-2 mr-2 text-4xl"
                title={flower.quality}
              >
                {flower.emoji}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
