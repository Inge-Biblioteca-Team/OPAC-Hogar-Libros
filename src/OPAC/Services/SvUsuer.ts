import axios from "axios";
import { Asistencia } from "../Types/Asistencia";
import api from "../../AxiosConfig";

const getUserInformationByCedula = async (Ncedula: string) => {
  try {
    const response = await axios.get(
      `https://apis.gometa.org/cedulas/${Ncedula}`
    );
    return response.data;
  } catch (error) {
    console.log("Usuario no encontrado", error);
  }
};

const NuevaAsistencia = async (NAsis: Asistencia) => {
  try {
    const response = await api.post(`attendance`, NAsis);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error al enviar asistencia:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data.message || "Error al enviar asistencia"
      );
    } else {
      console.error("Error desconocido:", error);
      throw new Error("Error desconocido");
    }
  }
};

export { getUserInformationByCedula, NuevaAsistencia };
