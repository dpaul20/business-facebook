import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export default function CommonPost() {
  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-center">
          <Avatar className="mr-2">
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="@usuario"
            />
            <AvatarFallback>CP</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-sm font-semibold">
              Carlos Pérez
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Recursos Humanos • Hace 5 horas
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>
          Recordatorio: Mañana tenemos la sesión de formación sobre
          &quot;Liderazgo Efectivo&quot; a las 10:00 AM en la Sala de
          Conferencias A. ¡No olviden registrarse!
        </p>
        <div className="mt-4 flex space-x-2">
          <Button variant="outline" size="sm">
            👍 Me gusta
          </Button>
          <Button variant="outline" size="sm">
            🔗 Compartir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
