import { defineField, defineType } from 'sanity'
import MagicTranslator from '../components/MagicTranslator'

export default defineType({
  name: 'gallery',
  title: 'Galería (Gallery Photos)',
  type: 'document',
  fields: [
    defineField({ 
      name: 'title', 
      title: 'Descripción de la Foto (Photo Description)', 
      type: 'object',
      fields: [
        { name: 'es', title: 'Español (Spanish)', type: 'string' },
        { 
          name: 'en', 
          title: 'Inglés (English)', 
          type: 'string',
          components: { input: MagicTranslator }
        }
      ]
    }),
    defineField({
      name: 'category',
      title: 'Categoría (Category)',
      type: 'string',
      options: {
        list: [
          { title: 'Acción (Action)', value: 'action' },
          { title: 'Sala (Showroom)', value: 'showroom' },
          { title: 'Detalle (Detail)', value: 'detail' }
        ],
        layout: 'radio' 
      }
    }),
    defineField({ 
      name: 'image', 
      title: 'Subir Imagen (Upload Image)', 
      type: 'image', 
      options: { hotspot: true } 
    }),
  ],
})