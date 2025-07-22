// utils/paymentGateway.js
import crypto from 'crypto';
import RazorpayPkg from 'razorpay';

function getRazorpay() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw new Error('Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET environment variables');
  }
  return new RazorpayPkg({ key_id: keyId, key_secret: keySecret });
}

export default {
  /**
   * @param {Object} options
   * @param {Number} options.amount - The amount to be captured (should be equal to the authorized amount, in paise)
   * @param {String} options.currency - The currency of the payment (defaults to INR)
   * @param {Object} options.metadata - Additional metadata to pass to Razorpay
   * @param {String} options.metadata.userId - The user ID
   */
  createOrder: async ({ amount, currency, metadata }) => {
    const razorpay = getRazorpay();
    const receipt = `rcpt_${metadata.userId}_${Date.now()}`;
    const options = {
      amount: amount * 100,
      currency,
      receipt,
      notes: metadata,
    };
    return razorpay.orders.create(options);
  },

  verifyPayment: (paymentResponse) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentResponse;
    const signatureData = `${razorpay_order_id}|${razorpay_payment_id}`;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(signatureData)
      .digest('hex');

    return expectedSignature === razorpay_signature;
  },
};

