import { Navbar } from "flowbite-react";
import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar className=" text-white bg-Body" fluid>
        <Navbar.Brand href="/" className=" my-2 space-x-2">
          <FontAwesomeIcon
            icon={faBookOpen}
            className="text-white h-10 w-10 md:hidden lg:table-cell max-sm:hidden cursor-pointer"
          />
          <span className="self-center whitespace-nowrap text-4xl font-semibold">
            Biblioteca Pública Municipal de Nicoya
          </span>
        </Navbar.Brand>
        <Navbar.Collapse>
          <Navbar.Link
            className="text-white  text-xl hover:scale-110 hover:!text-white hover:underline "
          >
            Asistencia
          </Navbar.Link>
          <Navbar.Link
            href="Equipo-computo"
            className="text-white  text-xl hover:scale-110 hover:!text-white hover:underline "
          >
            Equipo de computo
          </Navbar.Link>
          <Navbar.Link
            href="Libros"
            className="text-white  text-xl hover:scale-110 hover:!text-white hover:underline "
          >
            Libros
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <main>{children}</main>
    </>
  );
};

export default Layout;
