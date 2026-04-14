'use client';

import { useTranslations } from 'next-intl';
import CountUp from '@/components/ui/CountUp';

const stats = [
  { value: 12, suffix: '+', key: 'issues' },
  { value: 150, suffix: '+', key: 'partners' },
  { value: 80, suffix: '+', key: 'distribution' },
  { value: 50000, suffix: '+', key: 'readers' },
];

export default function StatsBar() {
  const t = useTranslations('home.stats');

  return (
    <section className="bg-white border-b border-black/10 py-16 md:py-20">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-black/10">
          {stats.map((stat, i) => (
            <div key={i} className="text-center px-6 py-4">
              <p className="font-playfair text-5xl md:text-6xl font-bold text-black leading-none">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </p>
              <p className="font-inter text-black/40 text-xs tracking-[0.25em] uppercase mt-3">
                {t(stat.key as 'issues' | 'partners' | 'distribution' | 'readers')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
