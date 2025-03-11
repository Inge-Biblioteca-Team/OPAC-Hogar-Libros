import { Dispatch, SetStateAction } from "react";

export type ModalOpen = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  };
  