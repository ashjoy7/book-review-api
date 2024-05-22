const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.getAllBooks);
router.post('/', bookController.getBookById);
router.get('/:id', bookController.createBook); 
router.put('/:id', bookController.updateBook); 
router.delete('/:id', bookController.deleteBook); 

module.exports = router;
