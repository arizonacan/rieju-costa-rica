import { defineField, defineType } from 'sanity'
import MagicTranslator from '../components/MagicTranslator'

export default defineType({
  name: 'motorcycle',
  title: 'Motos (Motorcycles)',
  type: 'document',
  fields: [
    defineField({
      name: 'model',
      title: 'Nombre del Modelo (Model Name)',
      type: 'string',
      description: 'Ej. / e.g. Rieju MR Racing 300',
    }),
    defineField({
      name: 'price',
      title: 'Precio ₡ (Price ₡)',
      type: 'number',
    }),
    defineField({
      name: 'mainImage',
      title: 'Foto de la Moto (Motorcycle Photo)',
      type: 'image',
      options: { hotspot: true }, 
    }),
    defineField({
      name: 'description',
      title: 'Motor / Descripción (Engine / Description)',
      type: 'object',
      fields: [
        { name: 'es', title: 'Español (Spanish)', type: 'string' },
        { 
          name: 'en', 
          title: 'Inglés (English)', 
          type: 'string',
          components: { input: MagicTranslator } // <-- MAGIC TRANSLATOR INJECTED
        }
      ]
    }),
    defineField({
      name: 'inStock',
      title: '¿En Inventario? (In Stock?)',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'weight',
      title: 'Peso (Weight)',
      type: 'object',
      fields: [
        { name: 'es', title: 'Español (Spanish) - Ej. 103.5 kg', type: 'string' },
        { 
          name: 'en', 
          title: 'Inglés (English) - e.g. 228 lbs', 
          type: 'string',
          components: { input: MagicTranslator } // <-- MAGIC TRANSLATOR INJECTED
        }
      ]
    }),
    defineField({
      name: 'suspension',
      title: 'Suspensión (Suspension)',
      type: 'object',
      fields: [
        { name: 'es', title: 'Español (Spanish)', type: 'string' },
        { 
          name: 'en', 
          title: 'Inglés (English)', 
          type: 'string',
          components: { input: MagicTranslator } // <-- MAGIC TRANSLATOR INJECTED
        }
      ]
    }),
  ],
})