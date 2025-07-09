import express from 'express';

import {
  create,
  getOne,
  list,
  listByUser,
  remove,
  update,
} from '../controllers/projectController.js';
import {
  authorize,
  protect,
} from '../middlewares/auth.js';
import { validateObjectId, validateRequiredFields } from '../utils/validation.js';

const router = express.Router();

// Public routes
router.get('/', list);
router.get('/:id', validateObjectId('id'), getOne);

// Protected routes: only Learners can create their own or Admin/Mentor
router.use(protect);
router.get('/my', authorize('Learner'), listByUser); // Move /my before other protected routes
router.post('/', validateRequiredFields(['title']), authorize('Learner', 'Admin', 'Mentor'), create);
router.put('/:id', validateObjectId('id'), authorize('Admin', 'Mentor'), update);
router.delete('/:id', validateObjectId('id'), authorize('Admin', 'Mentor'), remove);

export default router;