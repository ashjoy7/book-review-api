const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message
 *     description: Displays a welcome message to indicate that the API is running.
 *     responses:
 *       200:
 *         description: Welcome message
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Welcome to the Book Review API
 */
router.get('/', (req, res) => {
  res.send('Welcome to the Book Review API');
});

module.exports = router;
