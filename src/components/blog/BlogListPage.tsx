'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHero from '@/components/shared/SectionHero';
import FadeUp from '@/components/ui/FadeUp';

const CATS = ['all', 'business', 'fashion', 'lifestyle', 'hospitality', 'gastronomy'] as const;

const articles = [
  {
    id: 1,
    slug: 'georgian-entrepreneurs-caucasus',
    category: 'business',
    title: 'The New Wave of Georgian Entrepreneurs Reshaping the Caucasus',
    excerpt: 'A generation of founders are proving that Tbilisi is more than a beautiful backdrop—it\'s a genuine launchpad.',
    author: 'Nino Guruli',
    date: 'Jan 15, 2025',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
    featured: true,
  },
  {
    id: 2,
    slug: 'tbilisi-fashion-week',
    category: 'fashion',
    title: 'Tbilisi Fashion Week: A City Finding Its Voice',
    excerpt: 'Georgian designers are commanding global attention, blending heritage with a distinctly modern sensibility.',
    author: 'Ana Tkeshelashvili',
    date: 'Jan 10, 2025',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80',
    featured: false,
  },
  {
    id: 3,
    slug: 'georgian-wine',
    category: 'gastronomy',
    title: 'Georgian Wine: The World\'s Oldest Tradition',
    excerpt: 'How a 8,000-year-old tradition became the world\'s newest obsession.',
    author: 'George Modebadze',
    date: 'Dec 28, 2024',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80',
    featured: false,
  },
  {
    id: 4,
    slug: 'luxury-hotels-tbilisi',
    category: 'hospitality',
    title: 'The New Luxury: Tbilisi\'s Hotel Renaissance',
    excerpt: 'International brands are arriving, but the most compelling stays remain distinctly Georgian.',
    author: 'David Kezerashvili',
    date: 'Dec 20, 2024',
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
    featured: false,
  },
  {
    id: 5,
    slug: 'wellness-culture-georgia',
    category: 'lifestyle',
    title: 'The Georgian Approach to Wellness',
    excerpt: 'From ancient bathhouses to modern spas, wellness has always been part of the Georgian identity.',
    author: 'Mariam Jghenti',
    date: 'Dec 12, 2024',
    readTime: 4,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80',
    featured: false,
  },
  {
    id: 6,
    slug: 'fintech-revolution-georgia',
    category: 'business',
    title: 'Georgia\'s Fintech Revolution',
    excerpt: 'How a small country became a global leader in financial technology and digital banking.',
    author: 'Levan Tabatadze',
    date: 'Dec 5, 2024',
    readTime: 9,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
    featured: false,
  },
];

export default function BlogListPage() {
  const t = useTranslations('blog');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<typeof CATS[number]>('all');

  const filtered = activeCategory === 'all'
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="bg-black min-h-screen">
      <SectionHero title={t('hero_title')} />

      {/* Category filter */}
      <div className="bg-black border-b border-white/10 sticky top-16 md:top-20 z-30">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="flex gap-8 overflow-x-auto py-4">
            {CATS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs tracking-[0.25em] uppercase whitespace-nowrap transition-colors pb-1 ${
                  activeCategory === cat ? 'text-white border-b border-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                {t(`categories.${cat}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-20">
        {/* Featured article */}
        {featured && (
          <FadeUp className="mb-px">
            <Link href={`/${locale}/blog/${featured.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 mb-px">
                <div className="bg-black relative aspect-video lg:aspect-auto min-h-[400px] overflow-hidden img-zoom">
                  <Image src={featured.image} alt={featured.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
                </div>
                <div className="bg-black p-10 md:p-16 flex flex-col justify-center">
                  <span className="text-white/40 text-xs tracking-[0.3em] uppercase mb-4 block">
                    {t(`categories.${featured.category as typeof CATS[number]}`)}
                  </span>
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white uppercase leading-tight mb-4 group-hover:text-white/80 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-white/50 text-sm leading-relaxed tracking-wide mb-8">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-white/30 text-xs tracking-wide">
                    <span>{t('by')} {featured.author}</span>
                    <span>{featured.date}</span>
                    <span>{featured.readTime} {t('read_time')}</span>
                  </div>
                </div>
              </div>
            </Link>
          </FadeUp>
        )}

        {/* Rest cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 mt-px">
          {rest.map((article, i) => (
            <FadeUp key={article.id} delay={i * 0.08} className="bg-black">
              <Link href={`/${locale}/blog/${article.slug}`} className="group block p-8">
                <div className="relative aspect-video overflow-hidden img-zoom mb-6">
                  <Image src={article.image} alt={article.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
                <span className="text-white/40 text-xs tracking-[0.3em] uppercase mb-3 block">
                  {t(`categories.${article.category as typeof CATS[number]}`)}
                </span>
                <h3 className="font-playfair text-xl font-bold text-white uppercase leading-snug mb-3 group-hover:text-white/80 transition-colors">
                  {article.title}
                </h3>
                <p className="text-white/40 text-xs tracking-wide mb-4 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between text-white/25 text-xs tracking-wide">
                  <span>{article.date}</span>
                  <span>{article.readTime} {t('read_time')}</span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </div>
  );
}
