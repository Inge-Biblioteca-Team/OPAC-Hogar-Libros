import { createBrowserRouter, Outlet } from "react-router";
import OPACComputers from "./OPAC/Screens/OPACComputers";
import OPACBooks from "./OPAC/Screens/OPACBooks";
import OPACHome from "./OPAC/Screens/OPACHome";
import Layout from "./Layout/Layout";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <OPACHome />,
      },
      {
        path: "Libros",
        element: <OPACBooks />,
      },
      {
        path: "Equipo-Computo",
        element: <OPACComputers />,
      },
    ],
  },
]);

export default Routes;
