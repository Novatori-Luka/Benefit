'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FadeUp from '@/components/ui/FadeUp';
import { ArrowRight } from 'lucide-react';

export default function LatestIssueSection() {
  const t = useTranslations('home.latest_issue');
  const locale = useLocale();

  return (
    <section className="bg-black py-24 md:py-36 border-b border-white/10 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div className="order-2 lg:order-1">
            <FadeUp>
              <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-6">
                {t('label')}
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-playfair text-[clamp(3rem,7vw,6rem)] font-bold text-white leading-none mb-8">
                Issue<br />
                <span className="text-white/30">#012</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="space-y-3 mb-10">
                {['Business Leadership in the Caucasus', 'Fashion Week Tbilisi 2024', 'The New Luxury Hospitality'].map((topic, i) => (
                  <div key={i} className="flex items-center gap-4 border-b border-white/10 pb-3">
                    <span className="text-white/20 text-xs tracking-widest font-mono">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="font-inter text-white/70 text-sm tracking-wide">{topic}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <Link
                href={`/${locale}/magazine`}
                className="group inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black hover:border-white transition-all"
              >
                {t('cta')}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeUp>
          </div>

          {/* Image side */}
          <FadeUp delay={0.2} className="order-1 lg:order-2">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:ml-auto img-zoom">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
                alt="BENEFIT Magazine Issue 12"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Border overlay */}
              <div className="absolute inset-0 border border-white/10" />
              {/* Issue badge */}
              <div className="absolute top-6 right-6 bg-black px-3 py-2">
                <p className="text-white text-xs tracking-widest uppercase font-mono">Q4 / 2024</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
