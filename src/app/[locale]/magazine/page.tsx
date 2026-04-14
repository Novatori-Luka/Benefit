import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import MagazinePage from '@/components/magazine/MagazinePage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return { title: 'BENEFIT Magazine — All Issues' };
}

export default function Magazine() {
  return <MagazinePage />;
}
