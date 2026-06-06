import { defineField, defineType } from 'sanity'
import MagicTranslator from '../components/MagicTranslator'

export default defineType({
  name: 'part',
  title: 'Catálogo de Partes (Parts)',
  type: 'document',
  fields: [
    defineField({ 
      name: 'title', 
      title: 'Nombre de la Parte (Part Name)', 
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
          { title: 'Transmisión (Drivetrain)', value: 'drivetrain' },
          { title: 'Motor (Engine)', value: 'engine' },
          { title: 'Chasis (Chassis)', value: 'chassis' },
          { title: 'Controles (Controls)', value: 'controls' },
          { title: 'Mantenimiento (Maintenance)', value: 'maintenance' },
          { title: 'Protección (Protection)', value: 'protection' },
          { title: 'Extras (Extras)', value: 'extras' }
        ],
        layout: 'radio'
      }
    }),
    defineField({ 
      name: 'price', 
      title: 'Precio ₡ (Price ₡)', 
      type: 'number' 
    }),
    defineField({ 
      name: 'partNumber', 
      title: 'Número de Parte (Part Number)', 
      type: 'string',
      description: 'e.g., RJ-10948'
    }),
    defineField({ 
      name: 'fitment', 
      title: 'Compatibilidad (Fitment)', 
      type: 'object',
      fields: [
        { name: 'es', title: 'Español (Spanish) - e.g., MR Pro 2021-2026', type: 'string' },
        { 
          name: 'en', 
          title: 'Inglés (English) - e.g., MR Pro 2021-2026', 
          type: 'string',
          components: { input: MagicTranslator }
        }
      ]
    }),
    defineField({ 
      name: 'stock', 
      title: 'Inventario (Stock Status)', 
      type: 'object',
      fields: [
        { name: 'es', title: 'Español (Spanish) - e.g., En Inventario, 2 Disponibles', type: 'string' },
        { 
          name: 'en', 
          title: 'Inglés (English) - e.g., In Stock, 2 Left', 
          type: 'string',
          components: { input: MagicTranslator }
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