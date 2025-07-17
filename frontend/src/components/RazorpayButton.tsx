'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import fetchClient from '@/api/fetchClient';

// Add Razorpay types
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: PaymentResponse) => void;
  prefill: {
    name: string;
    email: string;
  };
  theme: {
    color: string;
  };
}

interface WindowWithRazorpay extends Window {
  Razorpay: new (options: RazorpayOptions) => { open: () => void };
}

interface RazorpayButtonProps {
  courseId: string;
  amount: number;
}

interface CreateOrderResponse {
  orderId: string;
}

interface PaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export default function RazorpayButton({ courseId, amount }: RazorpayButtonProps) {
  const router = useRouter();

  const handlePayment = async () => {
    try {
      // 1. Create order on backend
      const response = await fetchClient.post('/api/payments/create-session', {
        courseId,
        amount
      }) as { data: CreateOrderResponse };
      const { orderId } = response.data;

      // 2. Configure Razorpay options
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? '',
        amount: amount * 100, // in paise
        currency: 'INR',
        name: 'Project Learner',
        description: 'Course Purchase',
        order_id: orderId,
        handler: async function (response: PaymentResponse) {
          const res = await fetchClient.post('/api/payments/verify', {
            orderId,
            paymentResponse: response
          }) as { data: { verified: boolean } };

          if (res.data.verified) {
            alert('Payment successful!');
            router.refresh();
          } else {
            alert('Verification failed');
          }
        },
        prefill: {
          name: '',
          email: ''
        },
        theme: { color: '#3399cc' }
      };

      // 4. Open Razorpay Checkout
      const rzp = new ((window as unknown) as WindowWithRazorpay).Razorpay(options);
      rzp.open();
    } catch (error: unknown) {
      console.error('Payment error:', error);
      const message = error instanceof Error ? error.message : 'Payment failed';
      alert(message);
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Buy Course ₹{amount}
    </button>
  );
}
