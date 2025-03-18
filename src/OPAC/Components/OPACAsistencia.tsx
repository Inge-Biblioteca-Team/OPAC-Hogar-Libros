import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { ModalOpen } from "../Types/ModalTypes";
import UseDebounce from "../Hooks/UseDebounce";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { PersonData } from "../Types/UserType";
import { getUserInformationByCedula } from "../Services/SvUsuer";
import { useEffect } from "react";
import UseNewVisit from "../Hooks/UseNewVisit";
import { Asistencia } from "../Types/Asistencia";

const OPACAsistencia = ({ open, setOpen }: ModalOpen) => {

  const { register, setValue, handleSubmit, reset, watch } =
    useForm<Asistencia>();

  const { mutate, isLoading: Loading } = UseNewVisit();

  const onSubmit = (data: Asistencia) => {
    mutate(data, {
      onSuccess: () => {
        reset()
        setOpen(false);
      },
    });
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
      setValue("name", User.nombre);
    }
  }, [User, setValue]);

  return (
    <Modal show={open} onClose={() => setOpen(false)}>
      <ModalHeader>
        <div>Registro de asistencia</div>
      </ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)} >
        <ModalBody className="grid grid-cols-1 bg-white lg:grid-cols-2 gap-x-5 gap-y-4">
          <div>
            <label className="block mb-2">Cédula</label>
            <TextInput
              placeholder="Sin guiones ni espacios"
              {...register("cedula")}
              type="number"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Nombre Completo</label>
            <TextInput
              disabled={isLoading}
              placeholder={`${
                isLoading
                  ? "Porfavor espere..."
                  : "Introduzca su nombre completo"
              } `}
              type="text"
              required
              {...register("name")}
            />
          </div>
          <div className="lg:col-span-2">
            <label className="block mb-2">Género</label>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="gender-m"
                    type="radio"
                    value="M"
                    {...register("gender")}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="gender-m"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Masculino
                  </label>
                </div>
              </li>
              <li className="w-full dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="gender-f"
                    type="radio"
                    {...register("gender")}
                    value="F"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="gender-f"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Femenino
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <label className="block mb-2">Rango de edad</label>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="edad-0-6"
                    type="radio"
                    {...register("age")}
                    value="0 a 6"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="edad-0-6"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    0 a 5
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="edad-6-12"
                    type="radio"
                    {...register("age")}
                    value="6 a 12"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="edad-6-12"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    6 a 12
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="edad-13-17"
                    type="radio"
                    {...register("age")}
                    value="13 a 17"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="edad-13-17"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    13 a 17
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="edad-18-35"
                    type="radio"
                    {...register("age")}
                    value="18 a 35"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="edad-18-35"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    18 a 35
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="edad-36-64"
                    type="radio"
                    {...register("age")}
                    value="36 a 64"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="edad-36-64"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    36 a 64
                  </label>
                </div>
              </li>
              <li className="w-full dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="edad-65"
                    type="radio"
                    {...register("age")}
                    value="65 o mas"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="edad-65"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    65 a más
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-center">
          <Button color="red" tabIndex={2} onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button color={"blue"} type="submit" disabled={Loading} >
            {Loading? "Enviando":"Enviar"}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
export default OPACAsistencia;
