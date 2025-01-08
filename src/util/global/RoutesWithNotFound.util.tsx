import { Route, Routes } from "react-router-dom";
import { NotFound } from "../../components";

//#region
//Define una interfaz IProps con una propiedad children que puede ser un solo elemento JSX o una matriz de elementos JSX.
interface IProps {
  children: JSX.Element[] | JSX.Element;
}
//#endregion

/**
  Es una función de componente que toma un objeto IProps como argumento destructurado. 
  El propósito principal de este componente es envolver otras rutas (children) y mostrar una página "404 Not Found" si ninguna de las rutas coincide con la URL actual.
*/
function RoutesWithNotFound({ children }: IProps): JSX.Element {
  return (
    <>
      {/*Se utiliza el componente Routes de React Router para definir las rutas principales y se renderizan las rutas proporcionadas como children.*/}
      <Routes>
        {children}
        {/* 
          Además, hay una ruta adicional <Route path="*".
          Esta ruta se activará si ninguna de las rutas anteriores coincide con la URL actual. 
          El componente se renderizará en ese caso 
        */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default RoutesWithNotFound;
