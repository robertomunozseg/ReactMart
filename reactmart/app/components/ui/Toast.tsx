'use client';

import { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }: { message: string; type?: 'success' | 'error'; onClose: () => void; duration?: number }) {
  useEffect(() => {
    const id = setTimeout(() => onClose(), duration);
    return () => clearTimeout(id);
  }, [duration, onClose]);

  const base = 'px-4 py-2 rounded shadow-lg flex items-center gap-3 max-w-xs';
  const styles = type === 'success'
    ? `${base} bg-green-50 text-green-800 border border-green-100`
    : `${base} bg-red-50 text-red-800 border border-red-100`;

  return (
    <div role="status" aria-live="polite" className={`fixed top-4 right-4 z-50 ${styles} animate-slide-in`}> 
      <div className="flex-1">
        <div className="text-sm font-medium">{message}</div>
      </div>
      <button type="button" onClick={onClose} className="text-sm opacity-80 hover:opacity-100 focus:outline-none">
        ×
      </button>
      <style jsx>{`
        .animate-slide-in {
          transform: translateY(-6px); opacity: 0; animation: enter 220ms forwards ease-out;
        }
        @keyframes enter {
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
