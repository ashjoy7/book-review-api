const { MongoClient, ObjectId } = require('mongodb');

// MongoDB connection URI
const uri = process.env.MONGO_URI;

// Function to get the reviews collection
async function getReviewsCollection() {
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  return client.db().collection('reviews');
}

// Function to create a new review
exports.createReview = async (req, res) => {
  try {
    const reviewsCollection = await getReviewsCollection();
    const result = await reviewsCollection.insertOne(req.body);
    const createdReview = result.ops[0];
    res.status(201).json(createdReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviewsCollection = await getReviewsCollection();
    const reviews = await reviewsCollection.find({}).toArray();
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get a single review by ID
exports.getReviewById = async (req, res) => {
  try {
    const reviewsCollection = await getReviewsCollection();
    const review = await reviewsCollection.findOne({ _id: ObjectId(req.params.id) });
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to update a review
exports.updateReview = async (req, res) => {
  try {
    const reviewsCollection = await getReviewsCollection();
    const result = await reviewsCollection.updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body });
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json({ message: 'Review updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to delete a review
exports.deleteReview = async (req, res) => {
  try {
    const reviewsCollection = await getReviewsCollection();
    const result = await reviewsCollection.deleteOne({ _id: ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
