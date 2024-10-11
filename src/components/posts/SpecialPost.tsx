import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Megaphone } from "lucide-react";

export interface SpecialPostProps {
  title: string;
  content: string;
  author: string;
  department: string;
  icon?: React.ReactNode;
}

export default function SpecialPost() {
  const post = {
    title: "Nuevo Programa de Bienestar",
    content:
      "Estamos emocionados de anunciar el lanzamiento de nuestro nuevo programa de bienestar corporativo. A partir del próximo mes, todos los empleados tendrán acceso a clases de yoga, meditación y asesoramiento nutricional gratuitos. ¡Mantente atento a más detalles!",
    author: "María López",
    department: "Recursos Humanos",
  };
  return (
    <Card className="mb-4 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900">
      <CardHeader>
        <div className="flex items-center">
          <Avatar className="mr-2">
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt={post.author}
            />
            <AvatarFallback>{post.author[0]}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="flex items-center text-sm font-semibold">
              <span className="mr-2">
                <Megaphone className="h-5 w-5" />
              </span>
              {post.title}
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              {post.author} • {post.department}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
      </CardContent>
    </Card>
  );
}
