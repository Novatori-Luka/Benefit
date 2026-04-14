'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download, Eye } from 'lucide-react';
import SectionHero from '@/components/shared/SectionHero';
import FadeUp from '@/components/ui/FadeUp';

const CATEGORIES = ['ALL', 'BUSINESS', 'FASHION', 'HOTELS', 'GASTRONOMY', 'LIFESTYLE'];

const issues = [
  {
    id: 1, number: 12, date: 'Q4 2024',
    title_en: 'Power & Influence',
    cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
    topics: ['Business Leadership', 'Fashion Forward', 'New Hospitality'],
  },
  {
    id: 2, number: 11, date: 'Q3 2024',
    title_en: 'The Summer Edit',
    cover: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500&q=80',
    topics: ['Summer Lifestyle', 'Gastronomy', 'Travel'],
  },
  {
    id: 3, number: 10, date: 'Q2 2024',
    title_en: 'Luxury Reimagined',
    cover: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80',
    topics: ['Luxury Brands', 'Architecture', 'Innovation'],
  },
  {
    id: 4, number: 9, date: 'Q1 2024',
    title_en: 'New Beginnings',
    cover: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80',
    topics: ['Startups', 'Sustainability', 'Future of Work'],
  },
  {
    id: 5, number: 8, date: 'Q4 2023',
    title_en: 'The Art of Living',
    cover: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80',
    topics: ['Art & Design', 'Wellness', 'Culture'],
  },
  {
    id: 6, number: 7, date: 'Q3 2023',
    title_en: 'Georgian Pride',
    cover: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80',
    topics: ['Georgian Business', 'Heritage', 'Wine Culture'],
  },
];

export default function MagazinePage() {
  const t = useTranslations('magazine');
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState('ALL');

  return (
    <div className="bg-black min-h-screen">
      <SectionHero
        label={`${issues.length} ${t('issues_label')}`}
        title={t('hero_title')}
      />

      {/* Filter bar */}
      <div className="bg-black border-b border-white/10 sticky top-16 md:top-20 z-30">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="flex gap-8 overflow-x-auto py-4 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-xs tracking-[0.25em] uppercase whitespace-nowrap transition-colors pb-1 ${
                  activeFilter === cat
                    ? 'text-white border-b border-white'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {cat === 'ALL' ? t('filter_all') : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Issues grid */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {issues.map((issue, i) => (
            <FadeUp key={issue.id} delay={i * 0.08} className="bg-black">
              <div className="group p-8">
                {/* Cover */}
                <div className="relative aspect-[3/4] overflow-hidden img-zoom mb-6 border border-white/10">
                  <Image
                    src={issue.cover}
                    alt={`BENEFIT Issue ${issue.number}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-6">
                    <button className="flex flex-col items-center gap-2 text-white hover:text-white/70 transition-colors">
                      <Eye size={20} strokeWidth={1} />
                      <span className="text-[10px] tracking-widest uppercase">{t('read')}</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 text-white hover:text-white/70 transition-colors">
                      <Download size={20} strokeWidth={1} />
                      <span className="text-[10px] tracking-widest uppercase">{t('download')}</span>
                    </button>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-white/30 text-xs tracking-widest">
                    #{String(issue.number).padStart(3, '0')}
                  </span>
                  <span className="text-white/30 text-xs tracking-wide">{issue.date}</span>
                </div>
                <h3 className="font-playfair text-xl font-bold text-white mb-3 uppercase">
                  {issue.title_en}
                </h3>
                <div className="space-y-1">
                  {issue.topics.map((topic, j) => (
                    <p key={j} className="text-white/40 text-xs tracking-wide">{topic}</p>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* Newsletter inline CTA */}
      <div className="bg-white border-t border-black/10 py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <FadeUp>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-black uppercase mb-4">
              {t('newsletter_title')}
            </h2>
            <p className="text-black/50 text-sm tracking-wide mb-8">{t('newsletter_sub')}</p>
            <NewsletterForm />
          </FadeUp>
        </div>
      </div>
    </div>
  );
}

function NewsletterForm() {
  const t = useTranslations('magazine');
  return (
    <form className="flex gap-0 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="your@email.com"
        className="flex-1 bg-transparent border border-black/20 border-r-0 px-4 py-3 text-black text-sm focus:outline-none focus:border-black placeholder:text-black/30"
        required
      />
      <button
        type="submit"
        className="bg-black text-white px-6 py-3 text-xs tracking-widest uppercase hover:bg-black/80 transition-colors flex items-center gap-2"
      >
        {t('newsletter_btn')} <ArrowRight size={12} />
      </button>
    </form>
  );
}
