export default {
  create: {
    type: 'object',
    properties: {
      geolocation: {
        type: 'object',
        properties:{
          latitude: {
            type: 'number'
          },
          longitude:{
            type: 'number'
          },
        },
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
