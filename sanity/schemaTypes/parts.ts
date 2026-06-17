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
          { title: 'Extras (Extras)', value: 'extras' },
          { title: 'Protección (Protection)', value: 'protection' },
          { title: 'Cuidado de la Moto (Motorcycle Care)', value: 'care' }
        ],
        layout: 'dropdown'
      },
      validation: (Rule) => Rule.required().error('¡La categoría es obligatoria! / Category is required!')
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
      name: 'mainImage', 
      title: 'Foto Principal (Main Image)', 
      type: 'image', 
      options: { hotspot: true } 
    }),
  ],
  // --- ADDED: PREMIUM STUDIO PREVIEW UI ---
  preview: {
    select: {
      title: 'title.es', // Pulls the Spanish title for the list view
      subtitle: 'partNumber', // Shows the part number under the title
      media: 'mainImage'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title || 'Sin Título (Untitled)',
        subtitle: subtitle ? `Nº: ${subtitle}` : 'Sin número de parte',
        media: media
      };
    }
  }
})