import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { FinalizeLoan } from "../Services/SvComputerLoan";

const UseFinalizeSWLoan = () => {
  const queryClient = useQueryClient(); 
  return useMutation({
    mutationFn: FinalizeLoan,
    onSuccess: () => {
      queryClient.invalidateQueries("WSStatus");
      toast.success("Éxito, el equipo está nuevamente disponible")
    },
    onError: (error: Error) => {
      console.error("Error al finalizar el préstamo:", error);
    },
  });
};

export default UseFinalizeSWLoan;
