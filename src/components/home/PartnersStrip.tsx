'use client';

import { useTranslations } from 'next-intl';
import FadeUp from '@/components/ui/FadeUp';

// Placeholder partner logos as text wordmarks
const partners = [
  'RADISSON', 'TBC BANK', 'MARRIOTT', 'GEORGIAN AIRWAYS',
  'BOG', 'HILTON', 'WISSOL', 'BURGERS.GE',
  'COURTYARD', 'ADJARA GROUP', 'NOVA', 'FORMULA',
];

export default function PartnersStrip() {
  const t = useTranslations('home.partners');
  const repeated = [...partners, ...partners];

  return (
    <section className="bg-white border-b border-black/10 py-20">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-12">
        <FadeUp>
          <p className="text-black/30 text-xs tracking-[0.4em] uppercase text-center">
            {t('title')}
          </p>
        </FadeUp>
      </div>

      {/* Scrolling marquee */}
      <div className="overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div className="flex shrink-0 animate-marquee-slow">
            {repeated.map((name, i) => (
              <div
                key={i}
                className="inline-flex items-center justify-center mx-8 py-3 px-6 border border-black/10 hover:border-black/30 transition-colors min-w-[120px]"
              >
                <span className="font-inter text-black/40 text-xs tracking-[0.25em] uppercase font-medium hover:text-black/70 transition-colors">
                  {name}
                </span>
              </div>
            ))}
            {repeated.map((name, i) => (
              <div
                key={`dup-${i}`}
                className="inline-flex items-center justify-center mx-8 py-3 px-6 border border-black/10 hover:border-black/30 transition-colors min-w-[120px]"
              >
                <span className="font-inter text-black/40 text-xs tracking-[0.25em] uppercase font-medium hover:text-black/70 transition-colors">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
