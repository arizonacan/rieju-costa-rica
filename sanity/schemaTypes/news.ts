import { defineField, defineType } from 'sanity'
import MagicTranslator from '../components/MagicTranslator'

export default defineType({
  name: 'news',
  title: 'Noticias (News)',
  type: 'document',
  fields: [
    defineField({ 
      name: 'title', 
      title: 'Titular (Headline)', 
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
      name: 'date', 
      title: 'Fecha (Date Published)', 
      type: 'date' 
    }),
    defineField({ 
      name: 'excerpt', 
      title: 'Resumen para la tarjeta (Short Description)', 
      type: 'object',
      fields: [
        { name: 'es', title: 'Español (Spanish)', type: 'text' },
        { 
          name: 'en', 
          title: 'Inglés (English)', 
          type: 'text',
          components: { input: MagicTranslator }
        }
      ]
    }),
    defineField({ 
      name: 'content', 
      title: 'Contenido (Full Article Content)', 
      type: 'object',
      description: 'Presiona Enter para crear nuevos párrafos. (Press Enter to create new paragraphs.)',
      fields: [
        { name: 'es', title: 'Español (Spanish)', type: 'text' },
        { 
          name: 'en', 
          title: 'Inglés (English)', 
          type: 'text',
          components: { input: MagicTranslator }
        }
      ]
    }),
    defineField({ 
      name: 'mainImage', 
      title: 'Imagen de Portada (Cover Image)', 
      type: 'image', 
      options: { hotspot: true } 
    }),
  ],
})