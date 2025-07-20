// src/components/RazorpayButton.tsx
'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import fetchClient from '@/api/fetchClient';

import { useAuth } from './AuthProvider';

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
  const { user } = useAuth();

  const handlePayment = async () => {
    try {
      if (!user?._id) {
        console.warn('[Razorpay] user not logged in');
        alert('User not authenticated');
        return;
      }

      console.log('[Razorpay] creating session with', { courseId, amount, userId: user._id });
      const sessionResponse = await fetchClient.post(
        '/api/payments/create-session',
        { courseId, amount }
      ) as CreateSessionResponse;
      console.log('[Razorpay] session response:', sessionResponse);

      const { orderId } = sessionResponse;
      if (!orderId) {
        console.error('[Razorpay] missing orderId in response', sessionResponse);
        alert('Failed to create payment session');
        return;
      }

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: amount * 100,
        currency: 'INR',
        name: 'Project Learner',
        description: 'Course Purchase',
        order_id: orderId,
        handler: async (resp: PaymentVerificationRequest) => {
          console.log('[Razorpay] payment completed callback', resp);
          const verifyPayload = { orderId, paymentResponse: resp };
          console.log('[Razorpay] verifying payment', verifyPayload);
          const verifyResponse = await fetchClient.post(
            '/api/payments/verify',
            verifyPayload
          );
          console.log('[Razorpay] verify response:', verifyResponse);
          if ((verifyResponse as any).payment?.status === 'completed') {
            alert('Payment successful!');
            router.refresh();
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: user.fullName || '',
          email: user.email || ''
        },
        theme: { color: '#3399cc' }
      };

      console.log('[Razorpay] opening checkout with options', options);
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: unknown) {
      console.error('[Razorpay] error in handlePayment:', err);
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
