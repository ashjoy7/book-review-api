const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllReviews = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('reviews').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getReviewById = async (req, res, next) => {
  const reviewId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('reviews')
    .find({ _id: reviewId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createReview = async (req, res) => {
  const review = {
    reviewer: req.body.reviewer,
    content: req.body.content,
    rating: req.body.rating,
    bookId: req.body.bookId // Assuming each review is associated with a book
  };
  const response = await mongodb.getDb().db().collection('reviews').insertOne(review);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the review.');
  }
};

const updateReview = async (req, res) => {
  const reviewId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const review = {
    reviewer: req.body.reviewer,
    content: req.body.content,
    rating: req.body.rating,
    bookId: req.body.bookId // Assuming each review is associated with a book
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('reviews')
    .replaceOne({ _id: reviewId }, review);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the review.');
  }
};

const deleteReview = async (req, res) => {
  const reviewId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('reviews').remove({ _id: reviewId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the review.');
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
};
