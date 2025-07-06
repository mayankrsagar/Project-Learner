// routes/userRoutes.js
import express from 'express';

import {
  adminFetchUsers,
  adminUpdateUser,
  deleteUser,
  getUserProfile,
  login,
  logout,
  registerUser,
  updateUserProfileByAdmin,
  userUpdatingDetails,
} from '../controllers/userController.js';
import {
  authorize,
  protect,
} from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', login);
router.post('/logout', logout);

// All routes below require authentication
router.use(protect);

// User profile routes
router.get('/me', getUserProfile);
router.put('/me', userUpdatingDetails);
router.delete('/me', deleteUser);

// Admin-only routes
router.get('/', authorize('Admin'), adminFetchUsers);
router.put('/:id', authorize('Admin'), adminUpdateUser);
router.put('/admin/me', authorize('Admin'), updateUserProfileByAdmin);

export default router;
