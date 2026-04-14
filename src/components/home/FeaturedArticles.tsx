'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import FadeUp from '@/components/ui/FadeUp';

const articles = [
  {
    id: 1,
    category: 'BUSINESS',
    title: 'The New Wave of Georgian Entrepreneurs Reshaping the Caucasus',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
    slug: 'georgian-entrepreneurs-caucasus',
    size: 'large',
  },
  {
    id: 2,
    category: 'FASHION',
    title: 'Tbilisi Fashion Week: A City Finding Its Voice',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80',
    slug: 'tbilisi-fashion-week',
    size: 'small',
  },
  {
    id: 3,
    category: 'GASTRONOMY',
    title: "Georgian Wine: The World's Oldest Tradition, The World's Newest Obsession",
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80',
    slug: 'georgian-wine',
    size: 'small',
  },
];

export default function FeaturedArticles() {
  const t = useTranslations('home.featured');
  const tBlog = useTranslations('blog');
  const locale = useLocale();

  return (
    <section className="bg-black border-b border-white/10 py-24 md:py-36">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        {/* Header */}
        <FadeUp>
          <div className="flex items-end justify-between mb-16">
            <p className="text-white/30 text-xs tracking-[0.4em] uppercase">
              {t('title')}
            </p>
            <Link
              href={`/${locale}/blog`}
              className="group hidden md:inline-flex items-center gap-2 text-white/50 text-xs tracking-widest uppercase hover:text-white transition-colors underline-reveal"
            >
              {t('cta')}
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeUp>

        {/* Asymmetric editorial grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-px bg-white/10">
          {/* Large article */}
          <FadeUp className="lg:col-span-3 bg-black" delay={0.05}>
            <Link href={`/${locale}/blog/${articles[0].slug}`} className="block group h-full">
              <div className="relative aspect-[4/3] overflow-hidden img-zoom">
                <Image
                  src={articles[0].image}
                  alt={articles[0].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="text-white/60 text-xs tracking-[0.3em] uppercase mb-3 block">
                    {articles[0].category}
                  </span>
                  <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white leading-tight group-hover:text-white/80 transition-colors">
                    {articles[0].title}
                  </h3>
                  <p className="text-white/40 text-xs mt-3 tracking-wide">
                    {articles[0].readTime} {tBlog('read_time')}
                  </p>
                </div>
              </div>
            </Link>
          </FadeUp>

          {/* Two smaller articles stacked */}
          <div className="lg:col-span-2 flex flex-col gap-px bg-white/10">
            {articles.slice(1).map((article, i) => (
              <FadeUp key={article.id} className="bg-black flex-1" delay={0.1 + i * 0.1}>
                <Link href={`/${locale}/blog/${article.slug}`} className="block group h-full">
                  <div className="relative aspect-video md:aspect-[16/10] overflow-hidden img-zoom">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="text-white/60 text-xs tracking-[0.3em] uppercase mb-2 block">
                        {article.category}
                      </span>
                      <h3 className="font-playfair text-lg font-bold text-white leading-snug group-hover:text-white/80 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-white/40 text-xs mt-2 tracking-wide">
                        {article.readTime} {tBlog('read_time')}
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Mobile CTA */}
        <FadeUp className="mt-10 md:hidden" delay={0.2}>
          <Link
            href={`/${locale}/blog`}
            className="group inline-flex items-center gap-2 text-white/50 text-xs tracking-widest uppercase hover:text-white transition-colors underline-reveal"
          >
            {t('cta')}
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
