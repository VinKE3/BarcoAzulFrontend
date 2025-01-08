import { AdicionalCrudType, CrudType } from "./crud.types";

export type ModalIdType = string | null;

export type ModalCrudType = CrudType | AdicionalCrudType;

export type ModalPropType = "primer" | "segundo" | "tercer";
