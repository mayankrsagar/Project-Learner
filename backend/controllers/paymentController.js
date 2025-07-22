import mongoose from 'mongoose';

import { Payment } from '../models/Payment.js';
import User from '../models/User.js';
import gateway from '../utils/paymentGateway.js'; // Razorpay SDK wrapper

export const createSession = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { courseId, amount } = req.body;

    console.log('createSession body:', req.body, 'user:', req.user);

    // Validation checks
    if (!courseId || !amount || !userId) {
      return res.status(400).json({ message: 'Missing courseId, amount, or userId' });
    }

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid courseId' });
    }

    // Razorpay order creation
    let order;
    try {
      const options = {
        amount,
        currency: 'INR',
        metadata: { userId, courseId },
      };
      order = await gateway.createOrder(options);
      console.log('Razorpay order created:', order);
    } catch (err) {
      console.error("Razorpay createOrder failed:", err?.message || err);
      return res.status(500).json({ error: "Order creation failed" });
    }

    // Save to database
    try {
      await Payment.create({
        user: userId,
        course: courseId,
        orderId: order.id,
        amount,
        status: 'pending',
      });
    } catch (err) {
      console.error("Payment DB save failed:", err?.message || err);
      return res.status(500).json({ error: "Failed to save payment" });
    }

    res.json({ orderId: order.id });
  } catch (err) {
    console.error('createSession error:', err);
    next(err);
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const { orderId, paymentResponse } = req.body;

    console.log('verifyPayment payload:', req.body);

    if (!orderId || !paymentResponse) {
      return res.status(400).json({ message: 'Missing orderId or paymentResponse' });
    }

    // Signature check
    let verified = false;
    try {
      verified = gateway.verifyPayment(paymentResponse);
    } catch (err) {
      console.error('Signature verification error:', err?.message || err);
    }

    if (!verified) {
      console.warn('Payment signature mismatch');
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    const payment = await Payment.findOneAndUpdate(
      { orderId },
      { status: 'completed', transactionId: paymentResponse.razorpay_payment_id },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: 'Payment record not found' });
    }

    // Grant access
    await User.findByIdAndUpdate(payment.user, {
      $addToSet: { coursesEnrolled: payment.course }
    });

    res.json({ message: 'Payment successful', payment });
  } catch (err) {
    console.error('verifyPayment error:', err);
    next(err);
  }
};
