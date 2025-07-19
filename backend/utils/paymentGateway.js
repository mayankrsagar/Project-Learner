// utils/paymentGateway.js
import crypto from 'crypto';
import RazorpayPkg from 'razorpay';

function getRazorpay() {
  // runtime‐check your env vars
  const keyId     = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw new Error(
      'Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET environment variables'
    );
  }
  return new RazorpayPkg({ key_id: keyId, key_secret: keySecret });
}

export default {
  createOrder: async ({ amount, currency, metadata }) => {
    const razorpay = getRazorpay();
    const receipt  = `rcpt_${metadata.userId}_${Date.now()}`;
    return razorpay.orders.create({
      amount:  amount * 100,
      currency,
      receipt,
      notes: metadata,
    });
  },

  verifyPayment: (paymentResponse) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      paymentResponse;
    const signatureData    = `${razorpay_order_id}|${razorpay_payment_id}`;
    const keySecret        = process.env.RAZORPAY_KEY_SECRET;
    // At this point your guard above guarantees keySecret is a string
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(signatureData)
      .digest('hex');

    return expectedSignature === razorpay_signature;
  },
};
