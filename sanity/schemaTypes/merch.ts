import { defineField, defineType } from 'sanity'
import MagicTranslator from '../components/MagicTranslator'

export default defineType({
  name: 'merch',
  title: 'Ropa y Equipo (Merch)',
  type: 'document',
  fields: [
    defineField({ 
      name: 'title', 
      title: 'Nombre del Artículo (Item Name)', 
      type: 'object',
      fields: [
        { name: 'es', title: 'Español (Spanish)', type: 'string' },
        { 
          name: 'en', 
          title: 'Inglés (English)', 
          type: 'string',
          components: { input: MagicTranslator } // <-- MAGIC INJECTED HERE
        }
      ]
    }),
    defineField({
      name: 'category',
      title: 'Categoría (Category)',
      type: 'string',
      options: {
        list: [
          { title: 'Ropa (Apparel)', value: 'apparel' },
          { title: 'Accesorios (Accessories)', value: 'accessories' },
          { title: 'Gafas (Goggles)', value: 'goggles' },
          { title: 'Nutrición (Nutrition)', value: 'nutrition' }
        ],
        layout: 'radio'
      }
    }),
    defineField({ 
      name: 'price', 
      title: 'Precio (Number only, no $ sign)', 
      type: 'number' 
    }),
    defineField({ 
      name: 'material', 
      title: 'Material', 
      type: 'object',
      fields: [
        { name: 'es', title: 'Español (Spanish) - e.g., 100% Algodón', type: 'string' },
        { 
          name: 'en', 
          title: 'Inglés (English) - e.g., 100% Cotton', 
          type: 'string',
          components: { input: MagicTranslator } // <-- MAGIC INJECTED HERE
        }
      ]
    }),
    defineField({ 
      name: 'sizes', 
      title: 'Tallas Disponibles (Sizes)', 
      type: 'object',
      fields: [
        { name: 'es', title: 'Español (Spanish) - e.g., S, M, L o Talla Única', type: 'string' },
        { 
          name: 'en', 
          title: 'Inglés (English) - e.g., S, M, L or One Size', 
          type: 'string',
          components: { input: MagicTranslator } // <-- MAGIC INJECTED HERE
        }
      ]
    }),
    defineField({ 
      name: 'mainImage', 
      title: 'Foto Principal (Main Image)', 
      type: 'image', 
      options: { hotspot: true } 
    }),
  ],
})