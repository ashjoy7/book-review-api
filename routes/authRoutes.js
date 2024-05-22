const express = require('express');
const passport = require('passport');
const router = express.Router();

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Authenticate with Google
 *     description: Redirects the user to Google's authentication page.
 *     responses:
 *       302:
 *         description: Redirect to Google authentication page
 */

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Callback URL for Google authentication
 *     description: Handles the callback after Google authentication. Redirects the user back to the application.
 *     responses:
 *       302:
 *         description: Redirect to application after authentication
 *       500:
 *         description: Internal Server Error
 */
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});

module.exports = router;
