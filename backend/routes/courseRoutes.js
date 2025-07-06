import express from 'express';

import {
  create,
  getById,
  getBySlug,
  list,
  remove,
  update,
} from '../controllers/courseController.js';
import {
  authorize,
  protect,
} from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', list);
router.get('/slug/:slug', getBySlug);
router.get('/:id', getById);

// Protected routes (Admin/Mentor)
router.use(protect, authorize('Admin', 'Mentor'));
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;