import { useQuery } from "react-query";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "flowbite-react";
import OPACButtonAccionsWS from "../Components/OPACButtonAccionsWS";
import { GetStatus } from "../Services/SvComputerLoan";
import Loader from "../Assets/LoaderOPAC.gif";

const OPACComputers = () => {
  type ComputerStatus = {
    Status: string;
    MachineNumber: number;
  };

  const conditionColors: { [key: string]: string } = {
    "En Uso": "text-red-500",
    Disponible: "text-green-500",
    Mantenimiento: "text-yellow-500",
  };

  const { data: computers, isLoading } = useQuery<ComputerStatus[], Error>(
    ["WSStatus"],
    () => GetStatus(),
    {
      staleTime: 60,
    }
  );

  return (
    <>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <figure>
            <img width={400} src={Loader} alt="...Cargando" />
            <figcaption className="text-center">...Cargando</figcaption>
          </figure>
        </div>
      )}
      <main>
        <div className=" w-full flex items-center justify-center mt-12">
          <div className="grid grid-cols-4 gap-26 w-4/5">
            {computers?.map((computer) => (
              <div
                key={computer.MachineNumber}
                className="flex flex-col-reverse items-center p-2 "
              >
                <Popover content={<OPACButtonAccionsWS computer={computer} />}>
                  <div
                    title={"PC" + computer.MachineNumber}
                    className={`text-6xl ${conditionColors[computer.Status]}`}
                  >
                    <FontAwesomeIcon icon={faDesktop} />
                  </div>
                </Popover>
                <div className="text-black font-semibold text-xl ">
                  PC-
                  {computer.MachineNumber}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-5 space-x-8">
          <div className="flex items-center">
            <span className="text-green-500 text-2xl">●</span>
            <span className="ml-2">Disponible</span>
          </div>
          <div className="flex items-center">
            <span className="text-yellow-500 text-2xl">●</span>
            <span className="ml-2">En mantenimiento</span>
          </div>
          <div className="flex items-center">
            <span className="text-red-500 text-2xl">●</span>
            <span className="ml-2">En uso</span>
          </div>
        </div>
      </main>
    </>
  );
};

export default OPACComputers;
