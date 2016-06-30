export default {
  create: {
    type: 'object',
    properties: {
      geolocation: {
        type: 'array',
        items: {
          type: 'number'
        }
      },
      category: {
        type: 'string'
      },
      date: {
        type: 'string'
      }
    },
    required: ['geolocation', 'category', 'date']
  }
};
