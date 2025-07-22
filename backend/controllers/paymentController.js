// controllers/paymentController.js
import { Payment } from '../models/Payment.js';
import User from '../models/User.js';
import gateway from '../utils/paymentGateway.js'; // e.g. Razorpay SDK wrapper

export const createSession = async (req, res, next) => {
  try {
    const userId = req.user.id;           // from protect()
    const { courseId, amount } = req.body;
    console.log('createSession body:', req.body, 'user:', req.user);

    if (!courseId || !amount) {
      return res.status(400).json({ message: 'Missing courseId or amount' });
    }

    const order = await gateway.createOrder({
      amount,
      currency: 'INR',
      metadata: { userId, courseId },
    });
    console.log('Razorpay order created:', order);

    await Payment.create({
      user:     userId,
      course:   courseId,
      orderId:  order.id,
      amount,
      status:   'pending',
    });

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

    const verified = await gateway.validateWebhookSignature(
      paymentResponse.razorpay_order_id,
      paymentResponse.razorpay_payment_id,
      paymentResponse.razorpay_signature
    );
    if (!verified) {
      console.warn('Payment signature mismatch');
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    const payment = await Payment.findOneAndUpdate(
      { orderId },
      { status: 'completed', transactionId: paymentResponse.razorpay_payment_id },
      { new: true }
    );
    console.log('Payment record updated:', payment);

    // grant access
    await User.findByIdAndUpdate(payment.user, {
      $addToSet: { coursesEnrolled: payment.course }
    });

    res.json({ message: 'Payment successful', payment });
  } catch (err) {
    console.error('verifyPayment error:', err);
    next(err);
  }
};

