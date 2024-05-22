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
