const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

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

// Function to get a single book by ID
exports.getBookById = async (req, res) => {
  try {
    const booksCollection = await getBooksCollection();
    const book = await booksCollection.findOne({ _id: ObjectId(req.params.id) });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to update a book
exports.updateBook = async (req, res) => {
  try {
    const booksCollection = await getBooksCollection();
    const result = await booksCollection.updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body });
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to delete a book
exports.deleteBook = async (req, res) => {
  try {
    const booksCollection = await getBooksCollection();
    const result = await booksCollection.deleteOne({ _id: ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
