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
          { title: 'Ropa (Apparel)', value: 'ropa' },
          { title: 'Accesorios (Accessories)', value: 'accesorios' },
          { title: 'Trajes (Suits/Gear)', value: 'trajes' },
          { title: 'Botas (Boots)', value: 'botas' },
          { title: 'Cascos (Helmets)', value: 'cascos' },
          { title: 'Gafas (Goggles)', value: 'gafas' },
          { title: 'Nutrición (Nutrition)', value: 'nutricion' }
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
      subtitle: 'category', // Shows the category ID under the title
      media: 'mainImage'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      // Capitalize the first letter of the category for the subtitle
      const formattedCategory = subtitle ? subtitle.charAt(0).toUpperCase() + subtitle.slice(1) : 'Sin categoría';
      
      return {
        title: title || 'Sin Título (Untitled)',
        subtitle: `Categoría: ${formattedCategory}`,
        media: media
      };
    }
  }
})