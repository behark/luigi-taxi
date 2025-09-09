'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Languages } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LanguageToggle() {
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
        <div className="w-5 h-5" />
      </button>
    );
  }

  const switchLocale = () => {
    const newLocale = locale === 'en' ? 'de' : 'en';
    
    // Remove current locale from pathname if it exists
    const pathWithoutLocale = pathname.startsWith(`/${locale}`) 
      ? pathname.slice(`/${locale}`.length) 
      : pathname;
    
    // Build new path with new locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    
    router.push(newPath);
  };

  return (
    <button
      onClick={switchLocale}
      className="flex items-center space-x-2 p-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
      aria-label={`Switch to ${locale === 'en' ? 'German' : 'English'}`}
      title={`Switch to ${locale === 'en' ? 'Deutsch' : 'English'}`}
    >
      <Languages className="w-4 h-4 text-gray-700 dark:text-gray-300" />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {locale === 'en' ? 'DE' : 'EN'}
      </span>
    </button>
  );
}