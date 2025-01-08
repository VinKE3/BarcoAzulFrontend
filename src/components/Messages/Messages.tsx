import { XMarkIcon } from "@heroicons/react/20/solid";
import { useGlobalContext } from "../../hooks";
import { IMensajes, IMessages } from "../../models";
import { handleClearMensajes } from "../../util";

/**
 * Este componente es útil para mostrar mensajes de estado a los usuarios, proporcionando información sobre el éxito, errores, alertas e información general, mejorando la experiencia del usuario mediante una retroalimentación clara y accesible.
 */
const Messages: React.FC<IMessages> = ({ mensajes = null, showClose = true }) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  // Usa mensajes pasados o del contexto global
  const selectedMensajes: IMensajes[] = mensajes ?? globalContext.mensajes;
  //#endregion

  //#region Funciones
  // Función para determinar la clase CSS del mensaje basado en el tipo
  const handleColor = (tipo: number): string => {
    switch (tipo) {
      case 0:
        return "alert-base-bg-success";
      case 1:
        return "alert-base-bg-error";
      case 2:
        return "alert-base-bg-info";
      case 3:
        return "alert-base-bg-alert";
      default:
        return "alert-base-bg-other";
    }
  };

  // Función para determinar el encabezado del mensaje basado en el tipo
  const handleTipo = (tipo: number): string => {
    switch (tipo) {
      case 0:
        return "Completado:";
      case 1:
        return "Solucione lo siguiente para continuar:";
      case 2:
        return "Mensaje de Información:";
      case 3:
        return "Mensaje de Alerta:";
      default:
        return "Mensaje:";
    }
  };

  // Función para manejar el cierre del mensaje
  const handleClose = (index: number): void => {
    handleClearMensajes(setGlobalContext, index, false);
  };
  //#endregion

  if (selectedMensajes.every((x) => x.tipo < 0)) {
    return null; // Evitar renderizar el componente si no hay mensajes visibles
  }

  return (
    <div className="message-base">
      {selectedMensajes.map((mensaje, index) => (
        <div key={index} className={"alert-base " + handleColor(mensaje.tipo)}>
          <div className="alert-base-header">
            <p className="alert-base-header-title">{handleTipo(mensaje.tipo)}</p>
            {showClose && (
              <XMarkIcon
                title="Cerrar cuadro de mensaje"
                className="alert-base-header-icon-close"
                onClick={() => handleClose(index)}
              />
            )}
          </div>
          <div className={`alert-base-body ${mensaje.textos.length > 1 && "md:grid-cols-2"} `}>
            {mensaje.textos.map((texto, id) => (
              <p key={id}>{`• ${texto}`}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
