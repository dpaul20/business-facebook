import { Button } from "@/components/ui/button";

type CakeSelectorProps = {
  onSelect: (cake: string) => void;
};

export default function CakeSelector({ onSelect }: Readonly<CakeSelectorProps>) {
  const cakes = ["🎂", "🧁", "🍰", "🍥", "🥮", "🍮"];

  return (
    <div className="flex space-x-2">
      {cakes.map((cake, index) => (
        <Button
          key={index}
          onClick={() => onSelect(cake)}
          variant="outline"
          className="text-2xl hover:scale-125 transition-transform"
          aria-label={`Seleccionar pastel ${cake}`}
        >
          {cake}
        </Button>
      ))}
    </div>
  );
}
