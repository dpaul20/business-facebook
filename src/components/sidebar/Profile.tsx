import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export default function Profile() {
  // Simulación de un usuario con permisos especiales
  const currentUser = {
    name: "Deivy Gutiérrez",
    department: "Ingeniería",
    hasSpecialPostPermission: true,
    location: "Córdoba, Argentina",
    isRecruiter: true, // Set this to true for recruiters, false for regular employees
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mi Perfil</CardTitle>
      </CardHeader>
      <CardContent>
        <Avatar className="mb-4 h-24 w-24">
          <AvatarImage
            src="/placeholder.svg?height=96&width=96"
            alt="Foto de perfil"
          />
          <AvatarFallback>JP</AvatarFallback>
        </Avatar>
        <h3 className="text-lg font-semibold">{currentUser.name}</h3>
        <p className="text-sm text-muted-foreground">Sr Developer</p>
        <div className="mt-4">
          <p className="text-sm">
            <strong>Departamento:</strong> {currentUser.department}
          </p>
          <p className="text-sm">
            <strong>Ubicación:</strong> {currentUser.location}
          </p>
        </div>
        <Button className="mt-4 w-full">Editar Perfil</Button>
      </CardContent>
    </Card>
  );
}
