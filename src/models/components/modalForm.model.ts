export interface IModalForm {
  title: string; // Título del modal
  subTitle?: string; // SubTítulo del modal (opcional)
  className: string; // Clases CSS adicionales para estilizar el contenedor del modal
  children?: React.ReactNode; // Contenido del modal (inputs, botones, etc.)
  showClose?: boolean; // Bandera para mostrar o no el botón de cerrar
  onClose?: () => Promise<void> | void; // Función opcional para ejecutar al cerrar el modal
  replaceClose?: boolean; // Bandera para reemplazar la lógica de cierre por defecto
  enableKey?: boolean; // Bandera para habilitar o deshabilitar el cierre del modal con la tecla "Escape"
  origenMensajes?: string; // Origen de los mensajes, para el componente de mensajes
}
