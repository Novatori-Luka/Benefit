'use client';

import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight, Play, Share2, Film } from 'lucide-react';
import SectionHero from '@/components/shared/SectionHero';
import FadeUp from '@/components/ui/FadeUp';
import Link from 'next/link';

const services = [
  {
    icon: Share2,
    titleKey: 'social_title' as const,
    descKey: 'social_desc' as const,
    stat: '2M+',
    statLabel: 'Total Reach',
  },
  {
    icon: Film,
    titleKey: 'video_title' as const,
    descKey: 'video_desc' as const,
    stat: '50+',
    statLabel: 'Brand Films',
  },
  {
    icon: Play,
    titleKey: 'brand_title' as const,
    descKey: 'brand_desc' as const,
    stat: '100+',
    statLabel: 'Campaigns',
  },
];

const caseStudies = [
  {
    brand: 'TBC Bank',
    type: 'Social Media Campaign',
    result: '+340% Engagement',
    bg: 'bg-white',
    text: 'text-black',
  },
  {
    brand: 'Radisson Blu',
    type: 'Brand Film Series',
    result: '4.2M Views',
    bg: 'bg-black',
    text: 'text-white',
  },
  {
    brand: 'Georgian Airways',
    type: 'Brand Storytelling',
    result: '+180% Brand Recall',
    bg: 'bg-white',
    text: 'text-black',
  },
  {
    brand: 'Adjara Group',
    type: 'Video Production',
    result: '12 Brand Films',
    bg: 'bg-black',
    text: 'text-white',
  },
];

export default function DigitalPage() {
  const t = useTranslations('digital');
  const locale = useLocale();

  return (
    <div className="bg-black min-h-screen">
      <SectionHero
        title={t('hero_title')}
        subtitle={t('hero_sub')}
      />

      {/* Services */}
      <section className="border-b border-white/10 py-24 md:py-36">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className="px-0 md:px-10 py-12 md:py-0 group">
                    <div className="mb-8">
                      <Icon size={24} className="text-white/40 group-hover:text-white transition-colors duration-500" strokeWidth={1} />
                    </div>
                    <p className="font-playfair text-5xl font-bold text-white mb-2">{s.stat}</p>
                    <p className="text-white/30 text-xs tracking-widest uppercase mb-6">{s.statLabel}</p>
                    <h3 className="font-playfair text-2xl font-bold text-white uppercase mb-3">
                      {t(`services.${s.titleKey}`)}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed tracking-wide">
                      {t(`services.${s.descKey}`)}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Showreel */}
      <section className="bg-white border-b border-black/10 py-24 md:py-36">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <FadeUp>
            <p className="text-black/30 text-xs tracking-[0.4em] uppercase mb-10 text-center">{t('showreel')}</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="relative aspect-video bg-black/5 border border-black/10 overflow-hidden group">
              {/* YouTube/Vimeo embed placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 border border-black/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:border-black/50 transition-colors">
                    <Play size={28} className="text-black/40 ml-1" strokeWidth={1} />
                  </div>
                  <p className="text-black/30 text-xs tracking-widest uppercase">Watch Showreel 2024</p>
                </div>
              </div>
              {/* Replace the div above with an actual iframe when you have a video URL:
              <iframe
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              /> */}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Case Studies */}
      <section className="bg-black border-b border-white/10 py-24 md:py-36">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <FadeUp>
            <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-16">{t('cases')}</p>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10">
            {caseStudies.map((c, i) => (
              <FadeUp key={i} delay={i * 0.1} className={c.bg}>
                <div className="p-10 md:p-14">
                  <p className={`text-xs tracking-[0.3em] uppercase mb-4 ${c.text === 'text-white' ? 'text-white/30' : 'text-black/30'}`}>
                    {c.type}
                  </p>
                  <h3 className={`font-playfair text-3xl font-bold uppercase mb-6 ${c.text}`}>
                    {c.brand}
                  </h3>
                  <p className={`font-playfair text-5xl font-bold ${c.text === 'text-white' ? 'text-white/20' : 'text-black/20'}`}>
                    {c.result}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-28 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <FadeUp>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white uppercase mb-6">
              Ready to Stand Out?
            </h2>
            <p className="text-white/50 text-sm tracking-wide mb-10">
              Let's create something remarkable together.
            </p>
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-3 bg-white text-black px-10 py-5 text-xs tracking-[0.2em] uppercase hover:bg-white/90 transition-colors"
            >
              {t('cta')}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
