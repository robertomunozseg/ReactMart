'use client';

import { useState } from 'react';
import PaymentForm from './PaymentForm';
import Toast from '../ui/Toast';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCartItems, selectCartCount, selectCartTotal, incrementQuantity, decrementQuantity, removeFromCart, clearCart } from '@/store/slices/cartSlice';
import { formatNumber } from '@/app/utils';

export default function Cart() {
  const [open, setOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const total = useAppSelector(selectCartTotal);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-indigo-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-3 hover:bg-indigo-700"
        aria-label="Open cart"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8m0 0A1 1 0 006.4 22h11.2a1 1 0 00.98-.79L20 13M7 13l.4-2" />
        </svg>
        <span className="text-sm font-medium">Cart</span>
        {count > 0 && <span className="ml-1 bg-white text-indigo-600 rounded-full px-2 py-0.5 text-xs font-semibold">{count}</span>}
      </button>

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform ${open ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => dispatch(clearCart())} className="text-sm text-red-500 hover:text-red-700 hover:underline focus:outline-none focus:ring-2 focus:ring-red-200 rounded">Clear</button>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close cart" className="text-gray-600 hover:text-gray-800 hover:underline focus:outline-none focus:ring-2 focus:ring-gray-200 rounded">Close</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="text-center text-gray-500 mt-12">Your cart is empty</div>
            ) : (
              <ul className="space-y-4">
                {items.map(({ product, quantity }) => (
                  <li key={product.id} className="flex items-start gap-3">
                    <img src={product.thumbnail || '/favicon.svg'} alt={product.title} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-800">{product.title}</h3>
                        <span className="text-sm text-gray-700">${formatNumber(product.price)}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <button onClick={() => dispatch(decrementQuantity(product.id))} className="px-2 py-1 bg-gray-100 rounded">-</button>
                        <span className="text-sm">{quantity}</span>
                        <button onClick={() => dispatch(incrementQuantity(product.id))} className="px-2 py-1 bg-gray-100 rounded">+</button>
                        <button onClick={() => dispatch(removeFromCart(product.id))} className="ml-2 text-xs text-red-500">Remove</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-4 border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="text-lg font-semibold">${formatNumber(total)}</span>
            </div>

            {!checkoutOpen ? (
              <button type="button" onClick={() => { setCheckoutOpen(true); }} className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200">Checkout</button>
            ) : (
              <PaymentForm onCancel={() => { setCheckoutOpen(false); }} onSuccess={() => { setCheckoutOpen(false); showToast('Payment successful!', 'success'); }} />
            )}
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </>
  );
}
