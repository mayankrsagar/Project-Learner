import crypto from 'crypto';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default {
 createOrder: async ({ amount, currency, metadata }) => {
    // generate a unique receipt ID
    const receipt = `rcpt_${metadata.userId}_${Date.now()}`;

    return razorpay.orders.create({
      amount:  amount * 100,
      currency,
      receipt,           // ← now always defined
      notes: metadata,
    });
  },

  verifyPayment: (paymentResponse) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentResponse;
    const signatureData = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(signatureData)
      .digest('hex');

    return expectedSignature === razorpay_signature;
  },
};
