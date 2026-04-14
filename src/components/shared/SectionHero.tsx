'use client';

import { motion } from 'framer-motion';

interface SectionHeroProps {
  label?: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
}

export default function SectionHero({ label, title, subtitle, dark = true }: SectionHeroProps) {
  const bg = dark ? 'bg-black' : 'bg-white';
  const text = dark ? 'text-white' : 'text-black';
  const muted = dark ? 'text-white/30' : 'text-black/30';

  return (
    <section className={`${bg} pt-36 pb-20 md:pt-48 md:pb-28 border-b ${dark ? 'border-white/10' : 'border-black/10'} relative overflow-hidden`}>
      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />
      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12">
        {label && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`${muted} text-xs tracking-[0.4em] uppercase mb-8 font-inter`}
          >
            {label}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={`font-playfair font-bold ${text} text-[clamp(3rem,9vw,7rem)] leading-none uppercase tracking-tight`}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className={`${muted} text-sm md:text-base tracking-wide mt-6 max-w-xl font-inter`}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
