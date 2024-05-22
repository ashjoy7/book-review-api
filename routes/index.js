const express = require('express');
const router = express.Router();

router.use('/swagger', require('./swagger'));
router.use('/contacts', require('./bookRoutes'));
router.use('/reviews', require('./reviewRoutes'));

module.exports = router;
router.get('/', (req, res) => {
  res.send('Welcome to the Book Review API');
});

module.exports = router;
