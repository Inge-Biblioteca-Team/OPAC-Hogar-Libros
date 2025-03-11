export type Book = {
  Title: string;
  Author: string;
  Editorial: string;
  PublishedYear: number;
  ISBN: string;
  ShelfCategory: string;
  Cover: string;
  BookConditionRating: number;
  signatureCode: string;
  InscriptionCode: string;
  Observations: string;
  ReserveBook: boolean;
  BookCode: string;
  Status: boolean;
};

export type Catalog = {
  data: Book[];
  count: number;
};

export type BookLeading = {
  userCedula: string;
  userName: string;
  userPhone: string;
  userAddress: string;

  InscriptionCode: string;
  SignaCode: string;
  Title: string;
  Author: string;

  BookPickUpDate: string;
  LoanExpirationDate: string;
  bookBookCode: string;
  institution: string;
};
