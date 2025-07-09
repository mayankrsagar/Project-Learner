import jwt from 'jsonwebtoken';

import { findUserById } from '../services/userServices.js';

// Protect routes — ensure the user is signed in
export const protect = async (req, res, next) => {
  const token = req.cookies.token;           // requires cookie-parser
  
  // Debug logging
  console.log('🍪 Cookies received:', req.cookies);
  console.log('🔑 Token:', token ? 'Present' : 'Missing');
  
  if (!token) {
    console.log('❌ No token found in cookies');
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token decoded successfully:', { id: decoded.id, email: decoded.email });
    
    req.user = await findUserById(decoded.id).select('-password');
    if (!req.user) throw new Error('User not found');
    
    console.log('✅ User found:', req.user.email);
    next();
  } catch (err) {
    console.log('❌ Token verification failed:', err.message);
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};

// Authorize roles middleware
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    // This middleware is a concise and powerful way to handle role-based access control (RBAC)
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient rights' });
    }
    next();
  };
};
