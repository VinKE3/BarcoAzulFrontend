export interface IPermisoCrud {
    registrar: boolean;
    modificar: boolean;
    consultar: boolean;
    eliminar: boolean;
    anular: boolean;
  }
  
  export const defaultPermisoCrud: IPermisoCrud = {
    registrar: false,
    modificar: false,
    consultar: false,
    eliminar: false,
    anular: false,
  };
  