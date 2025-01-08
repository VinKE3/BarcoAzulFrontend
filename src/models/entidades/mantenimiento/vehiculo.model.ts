export interface IVehiculo {
  id: string;
  empresaId: string;
  empresaTransporteId: string;
  numeroPlaca: string;
  marca: string;
  modelo: string;
  certificadoInscripcion: string | null;
  observacion: string;
}

export const defaultVehiculo: IVehiculo = {
  id: "",
  empresaId: "",
  empresaTransporteId: "",
  numeroPlaca: "",
  marca: "",
  modelo: "",
  certificadoInscripcion: null,
  observacion: "",
};

export interface IEmpresaTransporte {
  empresaId: string;
  empresaTransporteId: string;
  numeroDocumentoIdentidad: string;
  nombre: string;
  direccion: string | null;
  telefono: string;
}

export interface IVehiculoTablas {
  empresasTransporte: IEmpresaTransporte[];
}

export const defaultVehiculoTablas: IVehiculoTablas = {
  empresasTransporte: [],
};

export interface IVehiculoFilter {
  numeroPlaca: string;
}

export const defaultVehiculoFilter: IVehiculoFilter = {
  numeroPlaca: "",
};

export interface IVehiculoTable {
  id: string;
  numeroPlaca: string;
  marca: string;
  empresaTransporteNombre: string;
}
