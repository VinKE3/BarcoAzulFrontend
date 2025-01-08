import { AxiosResponse } from "axios";

//AxiosCall<T> es una interfaz parametrizada por un tipo T, que representa el tipo de datos que se espera en la respuesta de la llamada Axios.
export interface AxiosCall<T> {
  /*
    call es una propiedad de tipo Promise<AxiosResponse<T>>. 
    Indica que call es una promesa que se espera que resuelva con un objeto AxiosResponse que contiene datos de tipo T. 
    Esta propiedad representa la llamada a la API utilizando Axios.
  */
  call: Promise<AxiosResponse<T>>;
  /*
    controller es una propiedad opcional de tipo AbortController. 
    Esta propiedad permite proporcionar un controlador AbortController para la cancelación de la llamada a la API en caso de ser necesario.
  */
  controller?: AbortController;
}
/*
    Esta interfaz proporciona una estructura clara para representar una llamada a la API utilizando Axios, donde se especifica la promesa resultante de la llamada (call) y opcionalmente un controlador AbortController para cancelar la operación asincrónica.
*/
