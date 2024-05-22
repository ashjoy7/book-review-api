const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/reviews', reviewController.getAllReviews);
router.post('/reviews', reviewController.createReview);
router.get('/reviews/:reviewId', reviewController.getReviewById);
router.put('/reviews/:reviewId', reviewController.updateReview);
router.delete('/reviews/:reviewId', reviewController.deleteReview);

module.exports = router;