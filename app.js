const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const swaggerRoutes = require('./routes/swagger'); 

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongodb.initDb((err) => {
  if (err) {
    console.error('MongoDB connection error:', err);
  } else {
    console.log('MongoDB connected');
    
    // Start the Express server after MongoDB connection
    app.listen(port, () => console.log(`Server running on port ${port}`));
  }
});

// Parse JSON bodies
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next(); // Call next() after setting headers
  });

// Define routes
const indexRoutes = require('./routes/index');
const bookRoutes = require('./routes/bookRoutes');
app.use('/', indexRoutes);
app.use('/api', bookRoutes);

// Serve Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
