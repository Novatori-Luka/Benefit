import BlogArticlePage from '@/components/blog/BlogArticlePage';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: `BENEFIT — ${slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}` };
}

export default function BlogArticle({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  return <BlogArticlePage params={params} />;
}
