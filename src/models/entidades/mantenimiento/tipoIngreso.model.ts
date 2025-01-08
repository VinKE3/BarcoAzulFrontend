export interface ITipoIngreso {
    id: string;
    descripcion: string;
  }
  
  export const defaultTipoIngreso: ITipoIngreso = {
    id: "",
    descripcion: "",
  };
  
  export interface ITipoIngresoFilter {
    descripcion: string;
  }
  
  export const defaultTipoIngresoFilter: ITipoIngresoFilter = {
    descripcion: "",
  };
  
  export interface ITipoIngresoTable {
    descripcion: string;
    id: string;
  }
  