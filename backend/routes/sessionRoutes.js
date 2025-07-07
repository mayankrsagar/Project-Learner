import express from 'express';

import * as ctrl from '../controllers/sessionController.js';
import {
  authorize,
  protect,
} from '../middlewares/auth.js';

const router = express.Router({ mergeParams: true });
router.get('/', ctrl.listForSprint);
router.post('/', protect, authorize('Admin','Mentor'), ctrl.create);
router.put('/:id', protect, authorize('Admin','Mentor'), ctrl.update);
router.delete('/:id', protect, authorize('Admin','Mentor'), ctrl.remove);
export default router;