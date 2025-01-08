export interface IPresentacionGeneral {
  id: string;
  descripcion: string;
}

export const defaultPresentacionGeneral: IPresentacionGeneral = {
  id: "",
  descripcion: "",
};

export interface IPresentacionGeneralFilter {
  descripcion: string;
}

export const defaultPresentacionGeneralFilter: IPresentacionGeneralFilter = {
  descripcion: "",
};

export interface IPresentacionGeneralTable {
  descripcion: string;
  id: string;
}
