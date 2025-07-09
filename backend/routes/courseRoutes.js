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
} from '../middlewares/auth.js';
import { validateObjectId, validateRequiredFields } from '../utils/validation.js';
import sprintRoutes from './sprintRoutes.js';

const router = express.Router();

// Public routes
router.get('/', list);
router.get('/slug/:slug', getBySlug);
router.get('/:id', validateObjectId('id'), getById);

// Public sprint routes - must be before protected routes
router.use('/:courseId/sprints', validateObjectId('courseId'), sprintRoutes);

// Protected routes (Admin/Mentor)
router.use(protect, authorize('Admin', 'Mentor'));
router.post('/', validateRequiredFields(['title', 'slug']), create);
router.put('/:id', validateObjectId('id'), update);
router.delete('/:id', validateObjectId('id'), remove);

export default router;