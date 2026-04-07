import { useState } from 'react';
import Button from '../../../components/common/Button';

export default function SuccessModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center animate-fade-in" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className="relative glass-strong rounded-3xl p-8 max-w-md w-full mx-4 text-center ambient-shadow animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/15 flex items-center justify-center">
          <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3 className="text-2xl font-bold text-on-surface font-[var(--font-heading)] mb-2">
          Đặt vé thành công!
        </h3>
        <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
          Cảm ơn bạn đã tin dùng MovieT. Thông tin vé đã được gửi về email và mục &ldquo;Vé của tôi&rdquo;.
        </p>

        <div className="flex gap-3 justify-center">
          <Button variant="primary" onClick={onClose}>
            Xem vé
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Về trang chủ
          </Button>
        </div>
      </div>
    </div>
  );
}
