import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { CreateNewWSLoan } from "../Services/SvComputerLoan";
import { NewWSLoan } from "../Types/ComputerLoan";
interface ApiError {
  message: string;
  response?: {
    data?: {
      message?: string;
    };
  };
}

const UseGenerateWSLoan = () => {
    const queryClient = useQueryClient(); 
  return useMutation({
    mutationFn: (data: NewWSLoan) => CreateNewWSLoan(data),
    onSuccess: (data) => {
      console.log("New loan created successfully:", data);
      queryClient.invalidateQueries("WSStatus");
      toast.success(`Éxito, equipo reservado correctamente`)
    },
    onError: (error:ApiError) => {
      if (error.response?.data?.message) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error("Error al crear el préstamo de equipo");
      }
      console.error("Error creating new loan:", error);
    },
  });
};

export default UseGenerateWSLoan;
