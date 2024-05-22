const { MongoClient, ObjectId } = require('mongodb');

// MongoDB connection URI
const uri = process.env.MONGO_URI;

// Function to get the MongoDB client
async function getClient() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  return client;
}

// Function to get the books collection
async function getBooksCollection() {
  const client = await getClient();
  return client.db().collection('books');
}

// Function to create a new book
exports.createBook = async (req, res) => {
  try {
    const booksCollection = await getBooksCollection();
    const result = await booksCollection.insertOne(req.body);
    const createdBook = result.ops[0];
    res.status(201).json(createdBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get all books
exports.getAllBooks = async (req, res) => {
  try {
    const booksCollection = await getBooksCollection();
    const books = await booksCollection.find({}).toArray();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};