export type WSLoan = {
  ComputerLoanId: number;
  workStation: number;
  UserName: string;
  cedula:string,
  LoanStartDate: Date;
  LoanExpireDate: Date;
  Status: string;
};

export type ApiWSResponse = {
  data: WSLoan[];
  count: number;
};

export type NewWSLoan = {
  MachineNumber: number;
  cedula: string;
  UserName: string;
};
export type NewWSMantenance = {
  MachineNumber: number;
  location: string;
  status: "Mantenimiento";
};
