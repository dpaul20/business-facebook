"use client";

import { Heart, Linkedin, Megaphone, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useState } from "react";
import MusiMiercoles from "@/components/musi-miercoles";
import FilmViernes from "@/components/film-viernes";
import LinkedInFeed from "@/components/linkedin-feed";
import UnifiedPostForm, {
  LinkedInPost,
  RegularPost,
} from "@/components/unified-post-form";
import CakeSelector from "@/components/cake-selector";
import AchievementGarden from "@/components/achievement-garden";
import { Navigation } from "@/components/navigation";
import { Textarea } from "@/components/ui/textarea";

export interface SpecialPostProps {
  title: string;
  content: string;
  author: string;
  department: string;
  icon?: React.ReactNode;
}

// Nuevo componente para publicaciones especiales
const SpecialPost = ({
  title,
  content,
  author,
  department,
  icon,
}: SpecialPostProps) => {
  return (
    <Card className="mb-4 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900">
      <CardHeader>
        <div className="flex items-center">
          <Avatar className="mr-2">
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt={author}
            />
            <AvatarFallback>{author[0]}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="flex items-center text-sm font-semibold">
              {icon && <span className="mr-2">{icon}</span>}
              {title}
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              {author} • {department}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
};

// Nuevo componente para agregar mensajes de apreciación
const AppreciationAdder = ({ onAdd }: { onAdd: (message: string) => void }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (message.trim()) {
      onAdd(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Comparte un mensaje de apreciación, un recuerdo positivo o un reconocimiento..."
        className="mb-2"
      />
      <Button type="submit">Agregar Apreciación</Button>
    </form>
  );
};

export default function Page() {
  const [cakeCount, setCakeCount] = useState<{ [key: string]: number }>({
    "🎂": 0,
    "🧁": 0,
    "🍰": 0,
    "🍥": 0,
    "🥮": 0,
    "🍮": 0,
  });
  const [appreciations, setAppreciations] = useState<string[]>([]);
  const [plantedFlowers, setPlantedFlowers] = useState<
    { emoji: string; quality: string }[]
  >([]);

  const handleCakeSelect = (cake: string) => {
    setCakeCount((prevCount) => ({
      ...prevCount,
      [cake]: prevCount[cake] + 1,
    }));
  };

  const handlePlantFlower = (flower: { emoji: string; quality: string }) => {
    setPlantedFlowers((prevFlowers) => [...prevFlowers, flower]);
  };

  // Simulación de un usuario con permisos especiales
  const currentUser = {
    name: "Juan Pérez",
    department: "Tecnología",
    hasSpecialPostPermission: true,
    isRecruiter: true, // Set this to true for recruiters, false for regular employees
  };

  const handleRegularPostSubmit = (post: RegularPost) => {
    // Here you would typically send the post to your backend
    console.log("Regular post submitted:", post);
  };

  const handleLinkedInPostSubmit = (post: LinkedInPost) => {
    // Here you would typically send the post to your backend
    console.log("LinkedIn post submitted:", post);
  };

  const handleAddAppreciation = (message: string) => {
    setAppreciations((prevAppreciations) => [...prevAppreciations, message]);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Barra de navegación */}
      <Navigation />

      {/* Contenido principal */}
      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
          {/* Barra lateral izquierda */}
          <div className="w-full lg:w-1/4">
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
                <p className="text-sm text-muted-foreground">
                  Desarrollador Senior
                </p>
                <div className="mt-4">
                  <p className="text-sm">
                    <strong>Departamento:</strong> {currentUser.department}
                  </p>
                  <p className="text-sm">
                    <strong>Ubicación:</strong> Oficina Central
                  </p>
                </div>
                <Button className="mt-4 w-full">Editar Perfil</Button>
              </CardContent>
            </Card>
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Grupos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <Button variant="ghost" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Equipo de Desarrollo
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Comité de Innovación
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Club de Lectura
                    </Button>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Feed principal */}
          <div className="w-full lg:w-1/2">
            {/* Unified Post Form */}
            <UnifiedPostForm
              onRegularPostSubmit={handleRegularPostSubmit}
              onLinkedInPostSubmit={handleLinkedInPostSubmit}
              currentUser={currentUser}
            />

            {/* MusiMiércoles */}
            <MusiMiercoles />

            {/* FilmViernes */}
            <FilmViernes />

            {/* Publicación de aniversario */}
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
                  Celebremos los 5 años de Ana en TechCorp. ¡Comparte un mensaje
                  de apreciación o un recuerdo positivo para crear su Mosaico de
                  Apreciación!
                </p>
                <AppreciationAdder onAdd={handleAddAppreciation} />
                <div className="mt-6">
                  <h4 className="mb-2 text-lg font-semibold">
                    Mosaico de Apreciación
                  </h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {appreciations.map((message, index) => (
                      <Card key={index} className="">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-2">
                            <Heart className="mt-1 h-5 w-5 flex-shrink-0 text-red-500" />
                            <p className="text-sm">{message}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Publicación de aniversario */}
            <Card className="mb-4 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900">
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
                  Celebremos los 5 años de Ana en TechCorp plantando flores en
                  su Jardín de Logros virtual. Cada flor representa una cualidad
                  o logro de Ana.
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

            {/* Publicación especial de ejemplo */}
            <SpecialPost
              title="Nuevo Programa de Bienestar"
              content="Estamos emocionados de anunciar el lanzamiento de nuestro nuevo programa de bienestar corporativo. A partir del próximo mes, todos los empleados tendrán acceso a clases de yoga, meditación y asesoramiento nutricional gratuitos. ¡Mantente atento a más detalles!"
              author="María López"
              department="Recursos Humanos"
              icon={<Megaphone className="h-5 w-5" />}
            />

            {/* Publicación automática de cumpleaños */}
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
                    <p className="text-xs text-muted-foreground">
                      Diseñadora UX • Hoy
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-lg">
                  Hoy es el cumpleaños de nuestra talentosa diseñadora.
                  ¡Celebremos enviando pasteles virtuales! 🥳
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

            {/* Publicaciones normales */}
            <Card className="mb-4">
              <CardHeader>
                <div className="flex items-center">
                  <Avatar className="mr-2">
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="@usuario"
                    />
                    <AvatarFallback>MG</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm font-semibold">
                      María González
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Gerente de Proyecto • Hace 2 horas
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  ¡Emocionados de anunciar que hemos completado el proyecto
                  Alpha con éxito! Gracias a todo el equipo por su arduo
                  trabajo. 🎉
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
          </div>

          {/* Barra lateral derecha (LinkedIn Feed) */}
          <div className="w-full lg:w-1/4">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Linkedin className="mr-2 h-5 w-5" />
                  Publicaciones de LinkedIn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LinkedInFeed />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
