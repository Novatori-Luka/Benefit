import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import MarqueeStrip from '@/components/home/MarqueeStrip';
import EcosystemSection from '@/components/home/EcosystemSection';
import DistributionSection from '@/components/home/DistributionSection';
import LatestIssueSection from '@/components/home/LatestIssueSection';
import StatsBar from '@/components/home/StatsBar';
import FeaturedArticles from '@/components/home/FeaturedArticles';
import PartnersStrip from '@/components/home/PartnersStrip';
import CTASection from '@/components/home/CTASection';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'BENEFIT — Premium Business & Lifestyle Media Platform',
    description: locale === 'ka'
      ? 'საქართველოს პრემიუმ ბიზნეს და ლაიფსტაილ მედია პლატფორმა.'
      : "Georgia's premier business and lifestyle media platform.",
  };
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <EcosystemSection />
      <DistributionSection />
      <LatestIssueSection />
      <StatsBar />
      <FeaturedArticles />
      <PartnersStrip />
      <CTASection />
    </>
  );
}
