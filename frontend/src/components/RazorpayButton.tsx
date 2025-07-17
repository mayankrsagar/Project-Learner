// src/components/RazorpayButton.tsx
'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import fetchClient from '@/api/fetchClient';

// Razorpay checkout options
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

// Backend create-session response shape
interface CreateSessionResponse {
  orderId: string;
  paymentToken?: string;
}

// Payment handler payload
interface PaymentVerificationRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export default function RazorpayButton({ courseId, amount }: RazorpayButtonProps) {
  const router = useRouter();

  const handlePayment = async () => {
    try {
      // 1. create a new order on the backend
      const { orderId } = (await fetchClient.post(
        '/api/payments/create-session',
        { courseId, amount }
      )) as Partial<CreateSessionResponse>;

      // 2. configure Razorpay checkout
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: amount * 100,    // convert rupees to paise
        currency: 'INR',
        name: 'Project Learner',
        description: 'Course Purchase',
        order_id: orderId,
        handler: async (resp: PaymentVerificationRequest) => {
          // verify payment on backend
          const verify = await fetchClient.post(
            '/api/payments/verify',
            { orderId, paymentResponse: resp }
          ) as { message: string; payment: { status: string } };

          if (verify.payment.status === 'completed') {
            alert('Payment successful!');
            router.refresh();
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: { name: '', email: '' },
        theme: { color: '#3399cc' },
      };

      // 3. open Razorpay modal
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
