export interface IFarmacologia {
  id: string;
  nombre: string;
  indicaciones: string | null;
  contraindicaciones: string | null;
  interaccion: string | null;
  posologia: string | null;
  recomendaciones: string | null;
}

export const defaultFarmacologia: IFarmacologia = {
  id: "",
  nombre: "",
  indicaciones: null,
  contraindicaciones: null,
  interaccion: null,
  posologia: null,
  recomendaciones: null,
};

export interface IFarmacologiaFilter {
  nombre: string;
}

export const defaultFarmacologiaFilter: IFarmacologiaFilter = {
  nombre: "",
};

export interface IFarmacologiaTable {
  id: string;
  nombre: string;
}
