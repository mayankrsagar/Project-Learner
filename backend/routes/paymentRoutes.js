import express from 'express';

import {
  createSession,
  verifyPayment,
} from '../controllers/paymentController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/create-session', protect, createSession);
router.post('/verify', protect, verifyPayment);

export default router;
