'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Share2 } from 'lucide-react';
import FadeUp from '@/components/ui/FadeUp';
import { use } from 'react';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

// Placeholder article data - in production this would come from Supabase
const articleData = {
  title: 'The New Wave of Georgian Entrepreneurs Reshaping the Caucasus',
  category: 'BUSINESS',
  author: 'Nino Guruli',
  date: 'January 15, 2025',
  readTime: 8,
  image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1400&q=90',
  content: `
    <p>A generation of founders are proving that Tbilisi is more than a beautiful backdrop—it's a genuine launchpad for businesses with global ambitions.</p>

    <p>Walk through the cobblestone streets of the Old Town and you'll find the same cafes that have served as informal offices for a decade of startup founders, venture capitalists passing through on a reconnaissance trip, and local operators building the next generation of Georgian enterprise.</p>

    <h2>The Infrastructure Is Ready</h2>

    <p>Georgia has quietly assembled the building blocks of a serious startup ecosystem. The country's flat tax rate, ease of company registration, and increasingly cosmopolitan talent pool have made it attractive to founders from across the post-Soviet region—and, more recently, from Western Europe and North America.</p>

    <p>The banking system, long a concern for international businesses, has undergone a digital transformation that has made Georgian fintech a genuine export product. TBC Bank and Bank of Georgia, both listed on the London Stock Exchange, have built digital products that are studied in MBA programs.</p>

    <h2>The Names to Know</h2>

    <p>The roster of Georgian founders making noise internationally is growing. In fintech, payments, hospitality, and logistics, a new class of operators is emerging—many of them educated abroad but committed to building at home.</p>

    <p>What binds them is a combination of Georgian hospitality instinct (obsessive attention to the customer experience) and a pragmatism born of operating in a market that doesn't forgive waste.</p>
  `,
};

const related = [
  {
    slug: 'georgia-fintech',
    title: "Georgia's Fintech Revolution",
    category: 'BUSINESS',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=70',
  },
  {
    slug: 'tbilisi-fashion-week',
    title: 'Tbilisi Fashion Week: A City Finding Its Voice',
    category: 'FASHION',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=70',
  },
  {
    slug: 'georgian-wine',
    title: "Georgian Wine: The World's Oldest Tradition",
    category: 'GASTRONOMY',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=70',
  },
];

export default function BlogArticlePage({ params }: Props) {
  const t = useTranslations('blog');
  const locale = useLocale();

  return (
    <div className="bg-black min-h-screen">
      {/* Back nav */}
      <div className="pt-28 pb-0 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase hover:text-white transition-colors"
        >
          <ArrowLeft size={12} /> {t('categories.all')}
        </Link>
      </div>

      {/* Hero image */}
      <div className="relative aspect-[16/7] mt-10 overflow-hidden">
        <Image
          src={articleData.image}
          alt={articleData.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      {/* Article content */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-16">
        <FadeUp>
          <span className="text-white/40 text-xs tracking-[0.3em] uppercase mb-6 block">
            {articleData.category}
          </span>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 className="font-playfair text-3xl md:text-5xl font-bold text-white uppercase leading-tight mb-8">
            {articleData.title}
          </h1>
        </FadeUp>
        <FadeUp delay={0.15}>
          <div className="flex items-center justify-between mb-12 pb-8 border-b border-white/10">
            <div className="flex items-center gap-6 text-white/40 text-xs tracking-wide">
              <span>{t('by')} {articleData.author}</span>
              <span>{articleData.date}</span>
              <span>{articleData.readTime} {t('read_time')}</span>
            </div>
            <button className="flex items-center gap-2 text-white/30 hover:text-white text-xs tracking-widest uppercase transition-colors">
              <Share2 size={12} /> {t('share')}
            </button>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-p:text-white/70 prose-p:leading-relaxed prose-p:font-inter prose-p:tracking-wide prose-p:text-base prose-p:mb-6
              prose-h2:font-playfair prose-h2:text-white prose-h2:uppercase prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4
              prose-a:text-white prose-a:no-underline hover:prose-a:text-white/70"
            dangerouslySetInnerHTML={{ __html: articleData.content }}
          />
        </FadeUp>

        {/* Author bio */}
        <FadeUp delay={0.1}>
          <div className="mt-16 pt-8 border-t border-white/10 flex gap-6 items-center">
            <div className="w-12 h-12 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center">
              <span className="text-white/60 font-playfair text-lg font-bold">
                {articleData.author[0]}
              </span>
            </div>
            <div>
              <p className="text-white text-sm font-medium tracking-wide">{articleData.author}</p>
              <p className="text-white/40 text-xs tracking-wide mt-1">Editor, BENEFIT Magazine</p>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* Related articles */}
      <div className="border-t border-white/10 py-20">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <FadeUp>
            <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-12">{t('related')}</p>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10">
            {related.map((a, i) => (
              <FadeUp key={a.slug} delay={i * 0.08} className="bg-black">
                <Link href={`/${locale}/blog/${a.slug}`} className="group block p-6">
                  <div className="relative aspect-video overflow-hidden img-zoom mb-5">
                    <Image src={a.image} alt={a.title} fill className="object-cover" sizes="33vw" />
                  </div>
                  <span className="text-white/30 text-xs tracking-widest uppercase mb-2 block">{a.category}</span>
                  <h4 className="font-playfair text-base font-bold text-white uppercase leading-snug group-hover:text-white/70 transition-colors">
                    {a.title}
                  </h4>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
