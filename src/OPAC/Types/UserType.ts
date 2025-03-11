export type User = {
  cedula: string;
  email: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  registerDate: Date;
  province: string;
  district: string;
  address: string;
  status: boolean;
  role: string;
  birthDate: Date;
  gender: string;
  loanPolicy:number
};

export type UsersResponse = {
  data: User[];
  count: number;
};

export type LoanInfo = {
  cedula: string;
  name: string;
  email: string;
  phoneNumber: string;
};

export type UserForNewLoan = {
  Name: string;
  Mail: string;
  PhoneNumber: string;
  Cedula: string;
};

export type SingIng = {
  username: string;
  password: string;
};

export type RegisterInfo = {
  cedula: string;
  email: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  province: string;
  district: string;
  gender: "M" | "F";
  address: string;
  birthDate: string;
  password: string;
  acceptTermsAndConditions: boolean;
  repeatPassword: string;
};

interface PersonResult {
  cedula: string;
  lastname: string;
  firstname: string;
}

export interface PersonData {
  cedula: string;
  nombre: string;
  results: PersonResult[];
  resultcount: number;
}
