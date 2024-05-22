const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/', reviewController.getAllReviews);
router.post('/', reviewController.getReviewById);
router.get('/:id', reviewController.createReview); 
router.put('/:id', reviewController.updateReview); 
router.delete('/:id', reviewController.deleteReview); 

module.exports = router;
