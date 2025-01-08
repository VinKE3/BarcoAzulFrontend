export interface IForm {
  data: any;
  tablas: any;
  filter?: any;
  retorno?: any;
}

export const defaultForm: IForm = {
  data: null,
  tablas: null,
  filter: null,
  retorno: null,
};
