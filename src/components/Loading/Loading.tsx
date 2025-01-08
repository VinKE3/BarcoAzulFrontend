import { useSelector } from "react-redux";
import { PuffLoader } from "react-spinners";
import logoLoading from "../../assets/images/logoLoading.png";
import { ILoading } from "../../models";
import { IAppStore } from "../../redux/store";

/**
 * Este componente muestra una indicación visual de carga mientras se espera una respuesta asíncrona, mejorando la experiencia del usuario al proporcionar retroalimentación sobre el estado de la aplicación.
 */
const Loading: React.FC<ILoading> = ({ logo = false, absolute = false }) => {
  // Selecciona el valor de darkMode desde el estado de la tienda Redux
  const { darkMode } = useSelector((store: IAppStore) => store.user);

  return (
    <div className={`loading-container${absolute ? "-absolute" : ""}`}>
      {/* Añade la clase "loading-container-absolute" si la propiedad absolute es verdadera */}

      {/* Muestra el logo si la propiedad logo es verdadera */}
      {logo && <img src={logoLoading} className="loading-logo-masy" />}

      <PuffLoader
        color={`${darkMode ? "#ffffff" : "#000000"}`}
        loading={true}
        size={100}
        speedMultiplier={1}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
export default Loading;
