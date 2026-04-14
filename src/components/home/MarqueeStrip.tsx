'use client';

import { useTranslations } from 'next-intl';

export default function MarqueeStrip() {
  const t = useTranslations('home');
  const text = t('marquee');
  const repeated = Array(6).fill(text).join('');

  return (
    <div className="bg-white border-y border-black/10 overflow-hidden py-4 select-none">
      <div className="flex whitespace-nowrap">
        <div className="animate-marquee flex shrink-0">
          <span className="font-inter text-black text-xs tracking-[0.3em] uppercase font-medium">
            {repeated}
          </span>
          <span className="font-inter text-black text-xs tracking-[0.3em] uppercase font-medium">
            {repeated}
          </span>
        </div>
      </div>
    </div>
  );
}
