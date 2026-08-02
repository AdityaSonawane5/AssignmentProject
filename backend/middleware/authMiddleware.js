const jwt = require('jsonwebtoken');
const { COOKIE_NAME } = require('../utils/generateToken');

/**
 * Protects a route: requires a valid JWT, either from the httpOnly cookie
 * (used by the browser) or an "Authorization: Bearer <token>" header
 * (handy for testing with curl/Postman). Attaches req.userId on success.
 */
function protect(req, res, next) {
  let token = req.cookies?.[COOKIE_NAME];

  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Session expired or invalid. Please log in again.' });
  }
}

module.exports = protect;
