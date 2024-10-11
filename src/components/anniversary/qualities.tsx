import { Button } from "@/components/ui/button";

type Quality = {
  emoji: string;
  quality: string;
};

type QualitiesProps = {
  onPlant: (quality: Quality) => void;
  votedEmojis: Set<string>;
};

export default function Qualities({
  onPlant,
  votedEmojis,
}: Readonly<QualitiesProps>) {
  const qualities: Quality[] = [
    { emoji: "🏅", quality: "Liderazgo" },
    { emoji: "❤️", quality: "Pasión" },
    { emoji: "🎨", quality: "Creatividad" },
    { emoji: "🤝", quality: "Colaboración" },
    { emoji: "🚀", quality: "Innovación" },
    { emoji: "💪", quality: "Dedicación" },
    { emoji: "🌟", quality: "Excelencia" },
    { emoji: "🏋️‍♂️", quality: "Esfuerzo" },
    { emoji: "🔍", quality: "Curiosidad" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {qualities.map((quality, index) => (
        <Button
          key={index}
          variant="outline"
          className="flex h-auto flex-col items-center p-4"
          onClick={() => onPlant(quality)}
          disabled={votedEmojis.has(quality.emoji)}
        >
          <span className="mb-2 text-3xl">{quality.emoji}</span>
          <span className="text-sm">{quality.quality}</span>
        </Button>
      ))}
    </div>
  );
}
