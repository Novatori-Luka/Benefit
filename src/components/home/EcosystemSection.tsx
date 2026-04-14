'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import FadeUp from '@/components/ui/FadeUp';
import { BookOpen, Mic, Play } from 'lucide-react';

const items = [
  {
    key: 'magazine',
    icon: BookOpen,
    titleKey: 'magazine_title',
    descKey: 'magazine_desc',
  },
  {
    key: 'talks',
    icon: Mic,
    titleKey: 'talks_title',
    descKey: 'talks_desc',
  },
  {
    key: 'digital',
    icon: Play,
    titleKey: 'digital_title',
    descKey: 'digital_desc',
  },
];

export default function EcosystemSection() {
  const t = useTranslations('home.ecosystem');

  return (
    <section className="bg-black border-b border-white/10 py-24 md:py-36">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        {/* Section label */}
        <FadeUp>
          <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-16 md:mb-24 text-center">
            {t('title')}
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeUp key={item.key} delay={i * 0.12}>
                <div className="px-0 md:px-10 py-12 md:py-0 group">
                  <div className="mb-8">
                    <Icon size={24} className="text-white/40 group-hover:text-white transition-colors duration-500" strokeWidth={1} />
                  </div>
                  <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white uppercase tracking-wide mb-4">
                    {t(item.titleKey)}
                  </h3>
                  <p className="font-inter text-white/50 text-sm leading-relaxed tracking-wide">
                    {t(item.descKey)}
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
