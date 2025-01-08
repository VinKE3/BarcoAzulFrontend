import { IArticuloFind } from "./articuloFindModal.model";

export interface IArticuloAlternativoFindModal {
  almacenId: string;
  articulo: IArticuloFind;
  inputFocus: string;
}

export interface IArticuloAlternativoFilter {
  isAlternativo: boolean;
  isFarmacologia: boolean;
  isGrupoFarmacologico: boolean;
  isLaboratorio: boolean;
  isStock: boolean;
}

export const defaultArticuloAlternativoFilter: IArticuloAlternativoFilter = {
  isAlternativo: true,
  isFarmacologia: false,
  isGrupoFarmacologico: false,
  isLaboratorio: false,
  isStock: false,
};
