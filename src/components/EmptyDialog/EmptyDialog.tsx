import { IEmptyDialog } from "../../models";

/**
 * Componente EmptyDialog que retorna un modal de confirmación con un título, texto y botones personalizados.
 */
const EmptyDialog: React.FC<IEmptyDialog> = ({ title, text, isClosable = true, children, onClose }) => {
  //#region Funciones
  /**
   * Maneja el cierre del modal cuando se hace clic fuera del contenido del diálogo.
   * @param event El evento de clic.
   */
  const handleClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (isClosable) {
      const dialogContainer = event.currentTarget; // El contenedor del modal
      const clickedElement = event.target as HTMLElement; // El elemento que fue clicado
      const dialogContent = dialogContainer.querySelector(".empty-dialog-container"); // El contenido del diálogo

      // Si se hizo clic fuera del contenido del diálogo, se cierra el modal
      if (dialogContent && !dialogContent.contains(clickedElement)) {
        onClose(); // Llama a la función onClose pasada como prop
      }
    }
  };
  //#endregion

  return (
    <div onClick={handleClose} className="modal-base">
      <div className="empty-dialog-container">
        <span className="empty-dialog-title">{title}</span>
        {text && <span className="empty-dialog-text">{text}</span>}
        {children}
      </div>
    </div>
  );
};

export default EmptyDialog;
