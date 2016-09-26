export default {
  create: {
    type: 'object',
    properties: {
      address: {
        type: 'string'
      },
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
    required: ['address', 'geolocation', 'category', 'date']
  }
};
