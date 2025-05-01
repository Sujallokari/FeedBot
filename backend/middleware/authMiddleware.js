const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; // Fetch from environment variable

const authMiddleware = (req, res, next) => {
  // Get token from Authorization header (Bearer <token>)
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Attach decoded user information to request object
    req.user = decoded;
    next(); // Proceed to next middleware or route handler
  });
};

module.exports = authMiddleware;
