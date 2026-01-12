'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/store/hooks';
import { clearCart } from '@/store/slices/cartSlice';
import { PaymentFormFields } from '@/models/paymentForm';

export default function PaymentForm({ onCancel, onSuccess } : { onCancel?: () => void; onSuccess?: () => void }) {
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<PaymentFormFields>();

  const onSubmit = (data: PaymentFormFields) => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess('Payment successful!');
      dispatch(clearCart());
      onSuccess && onSuccess();
      reset();
      // Clear the success message after a short delay
      setTimeout(() => setSuccess(null), 2000);
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      {success && <div className="p-2 bg-green-100 text-green-800 rounded" role="status" aria-live="polite">{success}</div>}

      <div>
        <label className="text-sm font-medium text-gray-700">Full name</label>
        <input {...register('fullName', { required: 'Full name is required' })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded" />
        {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded" />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Card number</label>
        <input {...register('cardNumber', { required: 'Card number is required', pattern: { value: /^\d{13,19}$/, message: 'Enter a valid card number (13-19 digits)' } })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded" inputMode="numeric" />
        {errors.cardNumber && <p className="text-xs text-red-500 mt-1">{errors.cardNumber.message}</p>}
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-700">Expiry (MM/YY)</label>
          <input {...register('expiry', { required: 'Expiry is required', pattern: { value: /^(0[1-9]|1[0-2])\/\d{2}$/, message: 'Format MM/YY' } })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded" placeholder="MM/YY" />
          {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry.message}</p>}
        </div>
        <div className="w-24">
          <label className="text-sm font-medium text-gray-700">CVV</label>
          <input {...register('cvv', { required: 'CVV is required', pattern: { value: /^\d{3,4}$/, message: 'Enter 3 or 4 digit CVV' } })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded" inputMode="numeric" />
          {errors.cvv && <p className="text-xs text-red-500 mt-1">{errors.cvv.message}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button type="submit" disabled={processing} className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-green-200">
          {processing ? 'Processing…' : 'Pay now'}
        </button>
        <button type="button" onClick={() => { onCancel && onCancel(); reset(); }} className="px-3 py-2 border rounded">Cancel</button>
      </div>
    </form>
  );
}
