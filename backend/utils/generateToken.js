const jwt = require('jsonwebtoken');

function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

const COOKIE_NAME = 'token';

function getCookieOptions() {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProd, // cookie only sent over HTTPS in production
    sameSite: isProd ? 'none' : 'lax', // 'none' is required for cross-domain (frontend/backend on different hosts) in production
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  };
}

module.exports = { generateToken, COOKIE_NAME, getCookieOptions };
