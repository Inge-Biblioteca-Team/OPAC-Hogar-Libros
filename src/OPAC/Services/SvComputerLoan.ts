
import api from "../../AxiosConfig";
import { NewWSLoan, NewWSMantenance } from "../Types/ComputerLoan";

//Gets
const GetStatus = async () => {
  try {
    const response = await api.get(`work-stations/workstation/Status`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al cargar el estado de los equipos de cómputo:",
      error
    );
    throw error;
  }
};

const GetWSLoans = async (
  page: number,
  limit: number,
  StartDate?: string,
  MachineNumber?: string
) => {
  try {
    const response = await api.get(`computer-loan`, {
      params: {
        Page: page,
        Limit: limit,
        ...(StartDate && { StartDate }),
        ...(MachineNumber && { MachineNumber }),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al cargar los equipos de cómputo prestados:", error);
    throw error;
  }
};

const FinalizeLoan = async (MachineNumber: number) => {
  try {
    const response = await api.patch(`computer-loan`,{MachineNumber:MachineNumber});
    return response.data;
  } catch (error) {
    console.error(
      "Error al finalizar el préstamo del equipo de cómputo:",
      error
    );
    throw error;
  }
};
const ReactiveWS = async (NMachine: number) => {
  try {
    const response = await api.patch(`work-stations/${NMachine}/available`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al reactivar como disponible el equipo de cómputo:",
      error
    );
    throw error;
  }
};

const MantenanceWS = async (Data: NewWSMantenance) => {
  try {
    const response = await api.patch(
      `work-stations/${Data.MachineNumber}/maintenance`,
      Data
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al cambiar el estado a mantenimiento al equipo de cómputo:",
      error
    );
    throw error;
  }
};
const CreateNewWSLoan = async (Data: NewWSLoan) => {
  try {
    const response = await api.post(`computer-loan`, Data);
    return response.data;
  } catch (error) {
    console.error("Error al crear el préstamo del equipo de cómputo:", error);
    throw error;
  }
};

export {
  GetStatus,
  GetWSLoans,
  FinalizeLoan,
  MantenanceWS,
  ReactiveWS,
  CreateNewWSLoan,
};
