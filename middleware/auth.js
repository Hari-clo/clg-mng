const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed: No token provided.' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'dcet_super_secret_jwt_key_2026');
    req.userData = {
      id: decodedToken.id,
      userId: decodedToken.userId,
      email: decodedToken.email,
      role: decodedToken.role,
      name: decodedToken.name
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed: Invalid token.' });
  }
};
