import { format } from "date-fns";
import {
  defaultArticuloCompleto,
  defaultClienteCompleto,
  defaultProveedor,
  IArticuloCompleto,
  IClienteCompleto,
  IProveedor,
} from "../mantenimiento";

export interface ISimplificado {
  empresaNumeroDocumentoIdentidad: string;
  empresaNombre: string;
  empresaDireccion: string;
  empresaDepartamentoId: string;
  empresaProvinciaId: string;
  empresaDistritoId: string;
  fechaInicio: string;
  fechaFin: string;
  usuarioId: string;
  clienteId: string;
  proveedorId: string;
  personalId: string;
  lineaId: string;
  subLineaId: string;
  articuloId: string;
  marcaId: number;
  conductorId: string;
  porcentajeIGV: number;
  cliente: IClienteCompleto;
  proveedor: IProveedor;
  articulo: IArticuloCompleto;
}

export const defaultSimplificado: ISimplificado = {
  empresaNumeroDocumentoIdentidad: "",
  empresaNombre: "",
  empresaDireccion: "",
  empresaDepartamentoId: "",
  empresaProvinciaId: "",
  empresaDistritoId: "",
  fechaInicio: format(new Date(), "yyyy-MM-dd"),
  fechaFin: format(new Date(), "yyyy-MM-dd"),
  usuarioId: "",
  clienteId: "",
  proveedorId: "",
  personalId: "",
  lineaId: "",
  subLineaId: "",
  articuloId: "",
  marcaId: 0,
  conductorId: "",
  porcentajeIGV: 0,
  cliente: defaultClienteCompleto,
  proveedor: defaultProveedor,
  articulo: defaultArticuloCompleto,
};
