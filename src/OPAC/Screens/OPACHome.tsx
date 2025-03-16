import OPACAsistencia from "../Components/OPACAsistencia";
import OPACBanner from "../Components/OPACBanner";
import OPACCard from "../Components/OPACCard";
import {
  faChalkboardUser,
  faChildren,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const OPACHome = () => {
  const [openAsistencia, setOpenAsistencia] = useState(false);

  return (
    <>
      <section
        id="Home"
        className="flex w-full items-center justify-center flex-col gap-5"
      >
        <OPACBanner />
        <div className="m-2 lg:m-0  lg:w-11/12">
          <div
            className="grid max-sm:grid-cols-2 gap-4 mt-10 md:grid-cols-2 lg:grid-cols-3 lg:pb-2
        lg:h-60 2xl:h-96"
          >
            <OPACCard
              Icon={faBookOpen}
              Title="Cátalogo de libros"
              Message="Explora la amplia cantidad de diversos libros"
              Path="Libros"
            />
            <OPACCard
              Icon={faChalkboardUser}
              Title="Equipos de cómputo"
              Message="Acceso a computadoras, la biblioteca cuenta con 20 computadoras las cuales están a disposición de los usuarios de la biblioteca."
              Path="Equipo-Computo"
            />
            <div
              className="max-sm:col-span-2 md:col-span-2 lg:col-span-1 "
              onClick={() => setOpenAsistencia(true)}
            >
              <OPACCard
                Icon={faChildren}
                Title="Asistencia"
                Message="Tu participación es clave para mejorar la gestión de la biblioteca. ¡Registra tu asistencia y sé parte del cambio!"
                Path=""
              />
            </div>
          </div>
        </div>
        <OPACAsistencia open={openAsistencia} setOpen={setOpenAsistencia} />
      </section>
    </>
  );
};

export default OPACHome;
