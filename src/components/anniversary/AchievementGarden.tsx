import { Button } from "@/components/ui/button";

type Flower = {
  emoji: string;
  quality: string;
};

type AchievementGardenProps = {
  onPlant: (flower: Flower) => void;
};

export default function AchievementGarden({ onPlant }: Readonly<AchievementGardenProps>) {
  const flowers: Flower[] = [
    { emoji: "🌻", quality: "Liderazgo" },
    { emoji: "🌹", quality: "Pasión" },
    { emoji: "🌼", quality: "Creatividad" },
    { emoji: "🌸", quality: "Colaboración" },
    { emoji: "🌺", quality: "Innovación" },
    { emoji: "🌷", quality: "Dedicación" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {flowers.map((flower, index) => (
        <Button
          key={index}
          variant="outline"
          className="flex flex-col items-center p-4 h-auto"
          onClick={() => onPlant(flower)}
        >
          <span className="text-3xl mb-2">{flower.emoji}</span>
          <span className="text-sm">{flower.quality}</span>
        </Button>
      ))}
    </div>
  );
}
