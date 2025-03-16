import { Navbar } from "flowbite-react";
import { ReactNode, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import OPACAsistencia from "../OPAC/Components/OPACAsistencia";
import { NavLink } from "react-router";

const Layout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Navbar className=" text-white bg-Body" fluid>
        <Navbar.Brand href="/" className=" my-2 space-x-2">
          <FontAwesomeIcon
            icon={faBookOpen}
            className="text-white h-10 w-10 max-md:hidden lg:table-cell max-sm:hidden cursor-pointer"
          />
          <span className="self-center whitespace-nowrap text-4xl font-semibold max-sm:text-base max-md:text-2xl">
            Biblioteca Pública Municipal de Nicoya
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link className="text-white max-sm:text-base max-md:text-lg text-xl hover:!text-white  hover:scale-110 relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-white after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full">
            <span onClick={() => setOpen(true)}>Asistencia</span>
          </Navbar.Link>
          <Navbar.Link
            as={NavLink}
            to="/Equipo-computo"
            className="text-white max-sm:text-base max-md:text-lg text-xl hover:!text-white  hover:scale-110 relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-white after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full "
          >
            Equipo de cómputo
          </Navbar.Link>
          <Navbar.Link
            as={NavLink}
            to="/Libros"
            className="text-white max-sm:text-base max-md:text-lg text-xl hover:!text-white  hover:scale-110 relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-white after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full "
          >
            Libros
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <main>{children}</main>
      <OPACAsistencia open={open} setOpen={setOpen} />
    </>
  );
};

export default Layout;
