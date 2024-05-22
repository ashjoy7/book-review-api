const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const swaggerRoutes = require('./routes/swagger'); 

const port = process.env.PORT || 3000;
const app = express();

const debug = require('debug');
debug.enable('mongodb,tls');

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

// Serve Swagger UI
app.use('/', swaggerRoutes);

// Define your routes here
app.use('/', require('./routes'));

// Handle preflight OPTIONS requests for CORS
app.options('*', (req, res) => {
    res.status(200).send();
});

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
