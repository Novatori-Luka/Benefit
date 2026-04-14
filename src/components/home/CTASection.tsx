'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import FadeUp from '@/components/ui/FadeUp';

export default function CTASection() {
  const t = useTranslations('home.cta');
  const locale = useLocale();

  return (
    <section className="relative bg-black py-36 md:py-48 overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <FadeUp>
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-12 bg-white/20" />
            <div className="w-1 h-1 rounded-full bg-white/40" />
            <div className="h-px w-12 bg-white/20" />
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 className="font-playfair text-[clamp(2.5rem,7vw,5.5rem)] font-bold text-white uppercase leading-none tracking-tight mb-10">
            {t('title')}
          </h2>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="font-inter text-white/50 text-sm md:text-base tracking-wide leading-relaxed max-w-xl mx-auto mb-14">
            {t('body')}
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <Link
            href={`/${locale}/partners`}
            className="group inline-flex items-center gap-3 bg-white text-black px-10 py-5 text-xs tracking-[0.25em] uppercase font-medium hover:bg-white/90 transition-colors"
          >
            {t('button')}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeUp>

        <FadeUp delay={0.4}>
          <div className="flex items-center justify-center gap-4 mt-16">
            <div className="h-px w-12 bg-white/10" />
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <div className="h-px w-12 bg-white/10" />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
