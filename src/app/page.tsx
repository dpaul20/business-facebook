import MusiMiercoles from "@/components/posts/MusiMiercoles";
import FilmViernes from "@/components/posts/FilmViernes";
import UnifiedPostForm from "@/components/forms/UnifiedPostForm";
import LinkedInSideBar from "@/components/linkedin";
import CommonPost from "@/components/posts/CommonPost";
import BirthdayPost from "@/components/birthday/BirthdayPost";
import SpecialPost from "@/components/posts/SpecialPost";
import Anniversary from "@/components/anniversary/Index";
import LeftSidebar from "@/components/sidebar/LeftSidebar";
import Navigation from "@/components/Navigation";


export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 px-2">
      {/* Barra de navegación */}
      <Navigation />

      {/* Contenido principal */}
      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
          {/* Barra lateral izquierda */}
          <LeftSidebar />

          {/* Feed principal */}
          <div className="w-full lg:w-1/2">
            {/* Unified Post Form */}
            <UnifiedPostForm />

            {/* MusiMiércoles */}
            <MusiMiercoles />

            {/* FilmViernes */}
            <FilmViernes />

            {/* Publicación de aniversario */}
            <Anniversary />

            {/* Publicación especial de ejemplo */}
            <SpecialPost />

            {/* Publicación automática de cumpleaños */}
            <BirthdayPost />

            {/* Publicaciones normales */}
            <CommonPost />
          </div>

          {/* Barra lateral derecha (LinkedIn Feed) */}
          <LinkedInSideBar />
        </div>
      </main>
    </div>
  );
}
