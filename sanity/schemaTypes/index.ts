import { type SchemaTypeDefinition } from 'sanity';
import product from './product'; // <--- Importamos el archivo que acabamos de crear

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product], // <--- Lo agregamos a la lista
};