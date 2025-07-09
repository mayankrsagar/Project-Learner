import express from 'express';

import * as ctrl from '../controllers/sprintController.js';
import {
  authorize,
  protect,
} from '../middlewares/auth.js';
import { validateObjectId, validateRequiredFields } from '../utils/validation.js';
import sessionRoutes from './sessionRoutes.js';

const router = express.Router({ mergeParams: true });

// Public routes
router.get('/', ctrl.listForCourse);                    // GET /api/courses/:courseId/sprints
router.get('/next', ctrl.getNext);                     // GET /api/courses/:courseId/sprints/next?order=1
router.get('/previous', ctrl.getPrevious);             // GET /api/courses/:courseId/sprints/previous?order=3
router.get('/:id', validateObjectId('id'), ctrl.getById); // GET /api/courses/:courseId/sprints/:id

// Protected routes (Admin/Mentor only)
router.use(protect, authorize('Admin', 'Mentor'));
router.post('/', validateRequiredFields(['code', 'title', 'order']), ctrl.create); // POST /api/courses/:courseId/sprints
router.put('/:id', validateObjectId('id'), ctrl.update);                          // PUT /api/courses/:courseId/sprints/:id
router.patch('/:id/status', validateObjectId('id'), validateRequiredFields(['status']), ctrl.updateStatus); // PATCH /api/courses/:courseId/sprints/:id/status
router.delete('/:id', validateObjectId('id'), ctrl.remove);                       // DELETE /api/courses/:courseId/sprints/:id

// Mount session sub-routes
router.use('/:sprintId/sessions', sessionRoutes);

export default router;
