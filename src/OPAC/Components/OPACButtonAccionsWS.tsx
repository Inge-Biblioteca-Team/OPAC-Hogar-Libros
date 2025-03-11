import { Button } from "flowbite-react";
import { useState } from "react";
import { HiCloudDownload, HiUserCircle } from "react-icons/hi";
import UseFinalizeSWLoan from "../Hooks/UseFinalizeSWLoan";
import ModalewSWLoan from "./ModalewSWLoan";

type ComputerStatus = {
  Status: string;
  MachineNumber: number;
};
const OPACButtonAccionsWS = ({ computer }: { computer: ComputerStatus }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { mutate: finalizeLoan } = UseFinalizeSWLoan();
  const handleFinalizeLoan = () => {
    finalizeLoan(computer.MachineNumber);
  };

  return (
    <>
      <Button.Group>
        {computer.Status === "Disponible" && (
          <>
            <Button color="gray" onClick={() => setOpen(true)}>
              <HiUserCircle className="mr-3 h-4 w-4" />
              En Uso
            </Button>
          </>
        )}

        {computer.Status === "En Uso" && (
          <Button color="gray" onClick={() => handleFinalizeLoan()}>
            <HiCloudDownload className="mr-3 h-4 w-4" />
            Finalizar uso
          </Button>
        )}
      </Button.Group>
      <ModalewSWLoan
        open={open}
        setOpen={setOpen}
        MNumber={computer.MachineNumber}
      />
    </>
  );
};

export default OPACButtonAccionsWS;
