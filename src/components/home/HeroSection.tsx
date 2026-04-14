'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const t = useTranslations('home.hero');
  const locale = useLocale();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const item = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Grain noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
        }}
      />

      {/* Very subtle center radial glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-white/[0.015] blur-3xl" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-20 text-center px-6 max-w-6xl mx-auto"
      >
        {/* Issue label */}
        <motion.p
          variants={item}
          className="text-white/40 text-xs tracking-[0.4em] uppercase mb-8 font-inter"
        >
          Georgia's Premium Media Platform · Since 2018
        </motion.p>

        {/* Main title */}
        <motion.h1
          variants={item}
          className="font-playfair font-black text-[clamp(5rem,18vw,14rem)] leading-none tracking-tight text-white uppercase"
        >
          {t('title')}
        </motion.h1>

        {/* Thin rule */}
        <motion.div variants={item} className="flex items-center gap-4 my-8 justify-center">
          <div className="h-px w-24 bg-white/20" />
          <div className="w-1 h-1 rounded-full bg-white/40" />
          <div className="h-px w-24 bg-white/20" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="font-inter text-white/60 text-sm md:text-base tracking-[0.15em] uppercase max-w-lg mx-auto"
        >
          {t('subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-4 mt-12 justify-center"
        >
          <Link
            href={`/${locale}/magazine`}
            className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-white/90 transition-colors"
          >
            {t('cta_magazine')}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href={`/${locale}/partners`}
            className="group inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium hover:border-white hover:bg-white hover:text-black transition-all"
          >
            {t('cta_partner')}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/30 animate-pulse" />
        <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll</p>
      </motion.div>
    </section>
  );
}
