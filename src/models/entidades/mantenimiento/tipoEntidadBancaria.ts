export interface ITipoEntidadBancaria {
  id: string;
  descripcion: string;
}

export const defaultTipoEntidadBancaria: ITipoEntidadBancaria = {
  id: "",
  descripcion: "",
};

export interface ITipoEntidadBancariaFilter {
  descripcion: string;
}

export const defaultTipoEntidadBancariaFilter: ITipoEntidadBancariaFilter = {
  descripcion: "",
};

export interface ITipoEntidadBancariaTable {
  descripcion: string;
  id: string;
}
