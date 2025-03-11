import { useMutation } from "react-query";
import { NuevaAsistencia } from "../Services/SvUsuer";
import toast from "react-hot-toast";
import { Asistencia } from "../Types/Asistencia";

const UseNewVisit = () => {
  return useMutation({
    mutationFn: (data: Asistencia) =>
      toast.promise(NuevaAsistencia(data), {
        loading: "Enviando...",
        success: <span>Asistenica registrada con éxito</span>,
        error: (error: Error) => (
          <span>Error al registrar asistencia: {error.message} </span>
        ),
      }),
  });
};

export default UseNewVisit;
