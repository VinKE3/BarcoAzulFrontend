import { configureStore } from "@reduxjs/toolkit";
import { IUser } from "../models";
import usuarioSliceReducer from "./states/user.state.ts";

/*
  Se define una interfaz AppStore que representa la estructura del estado global del store de Redux. 
  En este caso, el estado global tiene una propiedad usuario que es de tipo Usuario.
*/
export interface IAppStore {
  user: IUser;
}

/**
  Se configura el store de Redux utilizando configureStore. 
  Se proporciona un objeto de configuración con la propiedad reducer, que mapea el nombre del slice (usuario) al reducer correspondiente (usuarioSliceReducer). 
  Esto define cómo se gestionará el estado global de la aplicación.
*/
const store = configureStore<IAppStore>({
  reducer: {
    user: usuarioSliceReducer,
  },
});

export default store;
