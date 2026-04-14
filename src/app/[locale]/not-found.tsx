'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-mono text-white/20 text-[10rem] font-bold leading-none select-none mb-8">
          404
        </p>
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-white/10" />
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="h-px w-16 bg-white/10" />
        </div>
        <h1 className="font-playfair text-4xl font-bold text-white uppercase mb-4">
          Page Not Found
        </h1>
        <p className="text-white/40 text-sm tracking-wide mb-12 max-w-sm">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href={`/${locale}`}
          className="group inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black hover:border-white transition-all"
        >
          Back to Home
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}
