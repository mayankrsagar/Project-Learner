'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import fetchClient from '@/api/fetchClient';

import { useAuth } from './AuthProvider'; // ✅ Correct import

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: PaymentVerificationRequest) => void;
  prefill: { name: string; email: string };
  theme: { color: string };
}

declare global {
  interface Window {
    Razorpay: new (opts: RazorpayOptions) => { open(): void };
  }
}

interface RazorpayButtonProps {
  courseId: string;
  amount: number; // rupees
}

interface CreateSessionResponse {
  orderId: string;
  paymentToken?: string;
}

interface PaymentVerificationRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export default function RazorpayButton({ courseId, amount }: RazorpayButtonProps) {
  const router = useRouter();
  const { user } = useAuth(); // ✅ No need for Pick

  const handlePayment = async () => {
    try {
      if (!user?._id) {
        alert('User not authenticated');
        return;
      }

      // 1. Create order
      const { orderId } = await fetchClient.post('/api/payments/create-session', {
        courseId,
        amount,
        userId: user._id, // ✅ safer to rename here
      }) as CreateSessionResponse;

      // 2. Configure Razorpay
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: amount * 100,
        currency: 'INR',
        name: 'Project Learner',
        description: 'Course Purchase',
        order_id: orderId,
        handler: async (resp: PaymentVerificationRequest) => {
          const verify = await fetchClient.post('/api/payments/verify', {
            orderId,
            paymentResponse: resp,
          }) as { message: string; payment: { status: string } };

          if (verify.payment.status === 'completed') {
            alert('Payment successful!');
            router.refresh();
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: user.fullName || '',
          email: user.email || '',
        },
        theme: { color: '#3399cc' },
      };

      // 3. Open Razorpay modal
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err: unknown) {
      console.error('Payment error:', err);
      alert(err instanceof Error ? err.message : 'Payment failed');
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
