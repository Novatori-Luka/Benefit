import BlogListPage from '@/components/blog/BlogListPage';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'BENEFIT Journal — Articles' };

export default function Blog() {
  return <BlogListPage />;
}
