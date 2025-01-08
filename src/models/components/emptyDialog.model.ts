export interface IEmptyDialog {
  title: string; // El título del diálogo.
  text?: string; // El texto del diálogo.
  isClosable?: boolean;
  children: React.ReactNode; //Los botones o elementos hijos que se mostrarán en el diálogo.
  onClose: () => Promise<void> | void; //La función que se ejecutará cuando se cierre el diálogo.
}
