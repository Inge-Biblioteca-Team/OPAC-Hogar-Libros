import { Button, Label, Modal, TextInput } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import UseGenerateWSLoan from "../Hooks/UseGenerateWSLoan";
import { NewWSLoan } from "../Types/ComputerLoan";
import UseDebounce from "../Hooks/UseDebounce";
import { PersonData } from "../Types/UserType";
import { getUserInformationByCedula } from "../Services/SvUsuer";

const ModalewSWLoan = ({
  MNumber,
  open,
  setOpen,
}: {
  MNumber: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { register, setValue, handleSubmit, reset, watch } =
    useForm<NewWSLoan>();

  setValue("MachineNumber", MNumber);

  const { mutate, isLoading: Loading } = UseGenerateWSLoan();

  const onSubmit = (data: NewWSLoan) => {
    mutate(data, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  const onClose = () => {
    setOpen(false);
    reset();
  };

  const cedula = UseDebounce(watch("cedula"), 1000);

  const { data: User, isLoading } = useQuery<PersonData>(
    ["userInformation", cedula],
    () =>
      cedula
        ? getUserInformationByCedula(cedula)
        : Promise.reject("Cedula no encontrada"),
    {
      enabled: !!cedula,
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: 1,
    }
  );

  useEffect(() => {
    if (User) {
      setValue("UserName", User.nombre);
    }
  }, [User, setValue]);

  return (
    <Modal show={open} onClose={onClose} size={"md"}>
      <Modal.Header>
        <h5>Nuevo préstamo de equipo {MNumber} </h5>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className=" flex flex-col gap-5">
          <div>
            <Label htmlFor="UserName">Número de cédula</Label>
            <TextInput
              placeholder="Número de cédula sin guiones ni espacios"
              className=""
              type="number"
              pattern="[0-9]*"
              required
              {...register("cedula")}
            />
          </div>
          <div>
            <Label htmlFor="UserName">Nombre</Label>
            <TextInput
              disabled={isLoading}
              placeholder={`${
                isLoading
                  ? "Porfavor espere..."
                  : "Introduzca su nombre completo"
              } `}
              type="text"
              required
              {...register("UserName")}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className=" flex items-center justify-center gap-4">
          <Button color="red" tabIndex={2} onClick={()=>setOpen(false)}>
            Cancelar
          </Button>
          <Button color="blue" type="submit" disabled={Loading}>
            {Loading ? "Enviando" : "Confirmar"}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalewSWLoan;
