import express from 'express';

import {
  create,
  getOne,
  list,
  remove,
  update,
} from '../controllers/projectController.js';
import {
  authorize,
  protect,
} from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/', list);
router.get('/:id', getOne);

// Protected routes: only Learners can create their own or Admin/Mentor
router.use(protect);
router.post('/', authorize('Learner', 'Admin', 'Mentor'), create);
router.put('/:id', authorize('Admin', 'Mentor'), update);
router.delete('/:id', authorize('Admin', 'Mentor'), remove);

export default router;