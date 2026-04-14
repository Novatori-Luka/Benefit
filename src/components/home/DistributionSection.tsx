'use client';

import { useTranslations } from 'next-intl';
import FadeUp from '@/components/ui/FadeUp';
import { Plane, Building2, UtensilsCrossed, MapPin } from 'lucide-react';

const items = [
  { key: 'airport', icon: Plane },
  { key: 'hotels', icon: Building2 },
  { key: 'dining', icon: UtensilsCrossed },
  { key: 'venues', icon: MapPin },
];

export default function DistributionSection() {
  const t = useTranslations('home.distribution');

  return (
    <section className="bg-white py-24 md:py-36 border-b border-black/10">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <FadeUp>
          <p className="text-black/30 text-xs tracking-[0.4em] uppercase mb-16 md:mb-24 text-center">
            {t('title')}
          </p>
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-black/10">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeUp key={item.key} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center px-6 py-8 group">
                  <div className="mb-6 w-12 h-12 flex items-center justify-center border border-black/10 group-hover:border-black/40 transition-colors">
                    <Icon size={20} className="text-black/40 group-hover:text-black transition-colors" strokeWidth={1} />
                  </div>
                  <p className="font-inter text-black text-xs tracking-[0.2em] uppercase font-medium">
                    {t(item.key as 'airport' | 'hotels' | 'dining' | 'venues')}
                  </p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
