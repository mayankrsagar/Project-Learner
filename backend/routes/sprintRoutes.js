import express from 'express';

import * as ctrl from '../controllers/sprintController.js';
import {
  authorize,
  protect,
} from '../middlewares/auth.js';
import sessionRoutes from './sessionRoutes.js';

const router = express.Router({ mergeParams: true });
router.get('/', ctrl.listForCourse);
router.post('/', protect, authorize('Admin','Mentor'), ctrl.create);
router.put('/:id', protect, authorize('Admin','Mentor'), ctrl.update);
router.delete('/:id', protect, authorize('Admin','Mentor'), ctrl.remove);
// mount session sub‑routes
router.use('/:sprintId/sessions', sessionRoutes);
export default router;