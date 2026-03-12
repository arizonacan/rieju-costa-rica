export default {
  name: 'motorcycle',
  title: 'Motorcycle Inventory',
  type: 'document',
  fields: [
    {
      name: 'model',
      title: 'Model Name',
      type: 'string',
      description: 'e.g. Rieju MR Racing 300',
    },
    {
      name: 'price',
      title: 'Price ($)',
      type: 'number',
    },
    {
      name: 'mainImage',
      title: 'Motorcycle Photo',
      type: 'image',
      options: { hotspot: true }, 
    },
    {
      name: 'description',
      title: 'Specs / Description',
      type: 'text',
    },
    {
      name: 'inStock',
      title: 'In Stock?',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'weight',
      title: 'Weight',
      type: 'string',
      description: 'e.g., 103.5kg or 228 lbs',
    },
    {
      name: 'suspension',
      title: 'Suspension',
      type: 'string',
      description: 'e.g., KYB AOS (DLC Coated)',
    },
  ],
}