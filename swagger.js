const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Book Review API',
    description: 'API for managing book reviews',
  },
  host: 'localhost:3000', // Change this to your deployed host when deploying
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/bookRoutes.js', './routes/reviewRoutes.jsreview.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
