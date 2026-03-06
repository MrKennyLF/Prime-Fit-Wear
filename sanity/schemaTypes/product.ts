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
    // 👇 NUEVO SISTEMA DE STOCK POR TALLAS 👇
    defineField({
      name: 'sizeStock',
      title: 'Inventario por Tallas',
      type: 'array',
      description: 'Agrega las tallas disponibles y cuántas piezas hay de cada una.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'size',
              title: 'Talla',
              type: 'string',
              options: {
                list: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Unitalla'],
              },
            },
            {
              name: 'stock',
              title: 'Cantidad en Stock',
              type: 'number',
              validation: (rule) => rule.min(0).error('El stock no puede ser negativo'),
            },
          ],
          preview: {
            select: { title: 'size', subtitle: 'stock' },
            prepare(selection) {
              return {
                title: `Talla: ${selection.title}`,
                subtitle: `En stock: ${selection.subtitle}`
              }
            }
          }
        },
      ],
    }),
    // 👆 HASTA AQUÍ 👆
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
    {
      name: 'video',
      title: 'Video del Producto (Opcional)',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm', 
      },
    },
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Oversize', value: 'oversize' },
          { title: 'Baggy Pants', value: 'baggy' },
          { title: 'Sudaderas', value: 'hoodies' },
          { title: 'Chamarra', value: 'chamarra' },
          { title: 'Compresión', value: 'compresion' },
          { title: 'Olimpicas', value: 'olimpicas' },
          { title: 'Tanks', value: 'tanks' }, // <-- Aquí respetamos la categoría que agregó Carlos
          { title: 'Shorts', value: 'shorts' },
          { title: 'Accesorios', value: 'accesorios' },
          { title: 'Joggers', value: 'joggers' },
          { title: 'Faldas', value: 'faldas' },
          { title: 'Enteros', value: 'enteros' },
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