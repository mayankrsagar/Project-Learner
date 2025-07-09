import express from 'express';

import * as ctrl from '../controllers/sprintController.js';
import {
  authorize,
  protect,
} from '../middlewares/auth.js';

const router = express.Router();

// Admin only routes
router.use(protect, authorize('Admin'));

// GET /api/admin/sprints - Get all sprints across all courses
router.get('/', ctrl.listAll);

export default router;
