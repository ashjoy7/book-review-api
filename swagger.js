const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Book Review API',
    description: 'API for managing book reviews',
  },
  host: 'https://book-review-api-7zsi.onrender.com', 
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
