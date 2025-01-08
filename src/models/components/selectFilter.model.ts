export interface IOptionType {
  value: string | number;
  label?: string;
  descripcion?: string;
}

export interface ISelectFilter {
  id: string; // Identificador del select
  value: string | number | null; // Valor seleccionado
  data: any; // Datos para poblar las opciones del select
  disabled?: boolean; // Indica si el select está deshabilitado
  nextElementType?: "input" | "select"; // Tipo del siguiente elemento al cual enfocar
  nextElementId: string; // Identificador del siguiente elemento al cual enfocar
  handleData: (option: IOptionType | null, name: string) => void; // Función para manejar el cambio de selección
}
