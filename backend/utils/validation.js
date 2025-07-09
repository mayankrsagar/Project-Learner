import mongoose from 'mongoose';

/**
 * Validates if a string is a valid MongoDB ObjectID
 * @param {string} id - The ID to validate
 * @returns {boolean} - True if valid ObjectID, false otherwise
 */
export const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id) && id.match(/^[0-9a-fA-F]{24}$/);
};

/**
 * Middleware to validate MongoDB ObjectID in request params
 * @param {string} paramName - The parameter name to validate (default: 'id')
 * @returns {Function} - Express middleware function
 */
export const validateObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];
    if (!isValidObjectId(id)) {
      return res.status(400).json({ 
        message: `Invalid ${paramName} format`,
        error: 'Must be a valid MongoDB ObjectID'
      });
    }
    next();
  };
};

/**
 * Validates required fields in request body
 * @param {string[]} fields - Array of required field names
 * @returns {Function} - Express middleware function
 */
export const validateRequiredFields = (fields) => {
  return (req, res, next) => {
    const missing = fields.filter(field => !req.body[field]);
    if (missing.length > 0) {
      return res.status(400).json({
        message: 'Missing required fields',
        missing: missing
      });
    }
    next();
  };
};
