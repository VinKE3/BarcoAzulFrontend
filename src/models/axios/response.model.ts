import { AxiosHeaders } from "axios";
import { IMensajes } from "../../../../barcoazulfrontreact/src/models/context/global/mensajes.model";

export interface IResponse {
  data: any;
  messages: IMensajes[];
  success: boolean;
}

export interface IResponseFull {
  data: any;
  config: any;
  headers: AxiosHeaders;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

export interface IResponseBlob {
  data: Blob;
  headers: AxiosHeaders;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}
