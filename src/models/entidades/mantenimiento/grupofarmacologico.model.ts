export interface IGrupoFarmacologico {
  id: string;
  descripcion: string;
  fisiopatologia: string | null;
  accion: string | null;
  efecto: string | null;
}

export const defaultGrupoFarmacologico: IGrupoFarmacologico = {
  id: "",
  descripcion: "",
  fisiopatologia: null,
  accion: null,
  efecto: null,
};

export interface IGrupoFarmacologicoFilter {
  descripcion: string;
}

export const defaultGrupoFarmacologicoFilter: IGrupoFarmacologicoFilter = {
  descripcion: "",
};

export interface IGrupoFarmacologicoTable {
  id: string;
  descripcion: string;
}
