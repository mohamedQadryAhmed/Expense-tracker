import { verifyToken } from '../utils/token.js';
import { fail } from '../utils/formatResponse.js';

export const protect = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json(fail({ message: 'Unauthorized' }));
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json(fail({ message: 'Invalid token' }));
  }
  req.user = decoded;
  next();
};
