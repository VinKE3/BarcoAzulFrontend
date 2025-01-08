  
/*
    TypeWithKey es un tipo genérico que toma un parámetro T.
    { [key: string]: T } define la estructura del tipo. 
    Es un objeto donde las claves son de tipo string y los valores son del tipo T. 
    Esto significa que puedes acceder a cualquier propiedad utilizando una cadena como clave, y el valor asociado será de tipo T.
*/
export type TypeWithKey<T> = { [key: string]: T };