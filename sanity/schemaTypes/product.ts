import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Productos',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Producto',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (Link único)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Precio (MXN)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
    }),
    defineField({
      name: 'images',
      title: 'Imágenes',
      type: 'array',
      of: [{ type: 'image' }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Oversize', value: 'Oversize' },
          { title: 'Baggys', value: 'Baggys' },
          { title: 'Sudaderas', value: 'Sudaderas' },
          { title: 'Chamarra', value: 'Chamarra' },
          { title: 'Shorts', value: 'Shorts' },
          { title: 'Olimpicas', value: 'Olimpicas' },
          { title: 'Compresión', value: 'Compresion' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gender',
      title: 'Género',
      type: 'string',
      options: {
        list: [
          { title: 'Hombre', value: 'Hombre' },
          { title: 'Mujer', value: 'Mujer' },
          { title: 'Unisex', value: 'Unisex' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isNew',
      title: '¿Es Nuevo Lanzamiento?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});