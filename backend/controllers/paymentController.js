import { Payment } from '../models/Payment.js';
import gateway
  from '../utils/paymentGateway.js'; // e.g. Razorpay/Stripe wrapper

// controllers/paymentController.js
export const createSession = async (req, res) => {
  const userId   = req.user.id;           // from protect()
  const { courseId, amount } = req.body;

  const order = await gateway.createOrder({
    amount,
    currency: 'INR',
    metadata: { userId, courseId },
  });

  await Payment.create({
    user:          userId,
    course:        courseId,
    orderId:       order.id,
    amount,
    status:        'pending',
  });

  res.json({ orderId: order.id });
};


export const verifyPayment = async (req, res) => {
  const { orderId, paymentResponse } = req.body;
  const verified = gateway.verifyPayment(paymentResponse);
  if (!verified) return res.status(400).json({ message: 'Payment verification failed' });

  const payment = await Payment.findOneAndUpdate(
    { orderId },
    { status: 'completed', transactionId: paymentResponse.transactionId },
    { new: true }
  );
  // grant access
  await User.findByIdAndUpdate(payment.user, {
    $addToSet: { coursesEnrolled: payment.course }
  });
  res.json({ message: 'Payment successful', payment });
};
