/**
 * Guarda un valor en el almacenamiento local del navegador bajo una clave específica.
 *
 * La función `saveInLocalStorage` convierte el valor proporcionado a una cadena JSON
 * y lo almacena en `localStorage` bajo la clave especificada.
 *
 * @param key - La clave bajo la cual se almacenará el valor en `localStorage`.
 * @param value - El valor a almacenar en `localStorage`, que será serializado a JSON.
 * @typeParam T - Tipo genérico que representa el tipo de `value`.
 */
export const saveInLocalStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Obtiene un valor almacenado en el `localStorage` del navegador.
 *
 * La función `getLocalStorage` recupera el valor asociado a una clave específica en `localStorage`
 * y lo deserializa desde JSON. Si no se encuentra la clave, devuelve `null`.
 *
 * @param key - La clave asociada al valor en `localStorage`.
 * @typeParam T - Tipo genérico que representa el tipo de retorno esperado.
 * @returns El valor almacenado deserializado, o `null` si no se encuentra la clave.
 */
export const getLocalStorage = <T>(key: string): T | null => {
  const storageItem = localStorage.getItem(key);
  return !!storageItem && JSON.parse(storageItem);
};

/**
 * Limpia el almacenamiento local del navegador, ya sea eliminando un elemento específico
 * o limpiando todo el `localStorage`.
 *
 * La función `clearLocalStorage` elimina el elemento asociado a la clave proporcionada en `localStorage`.
 * Si la clave está vacía o solo contiene espacios, se borrará todo el `localStorage`.
 *
 * @param key - La clave del elemento a eliminar. Si está vacía, se elimina todo el `localStorage`.
 */
export const clearLocalStorage = (key: string): void => {
  if (key.trim() === "") {
    localStorage.clear(); // Limpia todo el localStorage
  } else {
    localStorage.removeItem(key);
  }
};
