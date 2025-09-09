'use client';

import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
  variant?: 'floating' | 'inline';
}

export default function WhatsAppButton({ 
  phoneNumber = '+436609002700',
  message = '',
  className = '',
  variant = 'floating'
}: WhatsAppButtonProps) {
  const t = useTranslations();

  const handleWhatsAppClick = () => {
    const defaultMessage = message || t('whatsapp.defaultMessage');
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (variant === 'floating') {
    return (
      <button
        onClick={handleWhatsAppClick}
        className={`fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-pulse ${className}`}
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 ${className}`}
    >
      <MessageCircle size={20} />
      <span>{t('whatsapp.bookNow')}</span>
    </button>
  );
}