const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/', reviewController.getAllReviews);
router.get('/', reviewController.getReviewById);
router.post('/:id', reviewController.createReview); 
router.put('/:id', reviewController.updateReview); 
router.delete('/:id', reviewController.deleteReview); 

module.exports = router;
