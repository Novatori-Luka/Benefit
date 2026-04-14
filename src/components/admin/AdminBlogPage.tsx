'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { slugify } from '@/lib/utils';
import type { Article } from '@/types';

const RichTextEditor = dynamic(() => import('./RichTextEditor'), { ssr: false });

const articleSchema = z.object({
  title_en: z.string().min(2),
  title_ka: z.string().min(2),
  slug: z.string().min(2),
  category: z.string().min(1),
  cover_image_url: z.string().url().or(z.literal('')),
  author: z.string().min(2),
  read_time: z.number().min(1),
  content_en: z.string().min(10),
  content_ka: z.string().min(10),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  is_published: z.boolean(),
});
type ArticleForm = z.infer<typeof articleSchema>;

const CATEGORIES = ['business', 'fashion', 'lifestyle', 'hospitality', 'gastronomy'];

export default function AdminBlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset, control, setValue, watch, formState: { errors, isSubmitting } } = useForm<ArticleForm>({
    resolver: zodResolver(articleSchema),
    defaultValues: { is_published: false, read_time: 5 },
  });

  const titleEn = watch('title_en');
  useEffect(() => {
    if (!editing) setValue('slug', slugify(titleEn || ''));
  }, [titleEn, editing, setValue]);

  const fetchArticles = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from('articles').select('*').order('published_at', { ascending: false });
    setArticles(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchArticles(); }, []);

  const onSubmit = async (data: ArticleForm) => {
    const supabase = createClient();
    if (editing) {
      const { error } = await supabase.from('articles').update(data).eq('id', editing);
      if (error) return toast.error(error.message);
      toast.success('Article updated!');
    } else {
      const { error } = await supabase.from('articles').insert({ ...data, published_at: new Date().toISOString() });
      if (error) return toast.error(error.message);
      toast.success('Article created!');
    }
    setShowForm(false);
    setEditing(null);
    reset();
    fetchArticles();
  };

  const handleEdit = (article: Article) => {
    setEditing(article.id);
    reset({
      title_en: article.title_en, title_ka: article.title_ka,
      slug: article.slug, category: article.category,
      cover_image_url: article.cover_image_url, author: article.author,
      read_time: article.read_time, content_en: article.content_en,
      content_ka: article.content_ka, meta_title: article.meta_title,
      meta_description: article.meta_description, is_published: article.is_published,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this article?')) return;
    const supabase = createClient();
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) toast.error(error.message);
    else { toast.success('Deleted!'); fetchArticles(); }
  };

  const togglePublish = async (article: Article) => {
    const supabase = createClient();
    await supabase.from('articles').update({ is_published: !article.is_published }).eq('id', article.id);
    fetchArticles();
  };

  if (showForm) {
    return (
      <div>
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => { setShowForm(false); setEditing(null); reset(); }} className="text-white/40 text-xs tracking-widest uppercase hover:text-white">
            ← Back
          </button>
          <h1 className="font-playfair text-2xl font-bold text-white uppercase">
            {editing ? 'Edit Article' : 'New Article'}
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="admin-label">Title (EN)</label>
              <input {...register('title_en')} className="admin-input" />
              {errors.title_en && <p className="admin-error">{errors.title_en.message}</p>}
            </div>
            <div>
              <label className="admin-label">Title (KA)</label>
              <input {...register('title_ka')} className="admin-input" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="admin-label">Slug</label>
              <input {...register('slug')} className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Category</label>
              <select {...register('category')} className="admin-select">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="admin-label">Read Time (min)</label>
              <input {...register('read_time', { valueAsNumber: true })} type="number" className="admin-input" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="admin-label">Author</label>
              <input {...register('author')} className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Cover Image URL</label>
              <input {...register('cover_image_url')} className="admin-input" />
            </div>
          </div>

          <div>
            <label className="admin-label">Content (EN)</label>
            <Controller
              name="content_en"
              control={control}
              render={({ field }) => <RichTextEditor value={field.value} onChange={field.onChange} />}
            />
          </div>
          <div>
            <label className="admin-label">Content (KA)</label>
            <Controller
              name="content_ka"
              control={control}
              render={({ field }) => <RichTextEditor value={field.value} onChange={field.onChange} />}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="admin-label">Meta Title</label>
              <input {...register('meta_title')} className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Meta Description</label>
              <input {...register('meta_description')} className="admin-input" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="published" {...register('is_published')} className="accent-white" />
            <label htmlFor="published" className="text-white/60 text-xs tracking-widest uppercase">Publish immediately</label>
          </div>

          <button type="submit" disabled={isSubmitting} className="admin-btn">
            {isSubmitting ? 'Saving...' : editing ? 'Update Article' : 'Create Article'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-playfair text-3xl font-bold text-white uppercase">Blog</h1>
        <button onClick={() => setShowForm(true)} className="admin-btn flex items-center gap-2">
          <Plus size={14} /> New Article
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => <div key={i} className="skeleton h-14 rounded" />)}
        </div>
      ) : (
        <div className="border border-white/10 divide-y divide-white/10">
          {articles.map((article) => (
            <div key={article.id} className="flex items-center justify-between p-4 hover:bg-white/5">
              <div>
                <p className="text-white text-sm font-medium">{article.title_en}</p>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-white/30 text-xs tracking-widest uppercase">{article.category}</span>
                  <span className="text-white/30 text-xs">{new Date(article.published_at).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => togglePublish(article)} className="text-white/30 hover:text-white transition-colors">
                  {article.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button onClick={() => handleEdit(article)} className="text-white/30 hover:text-white transition-colors">
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(article.id)} className="text-white/30 hover:text-red-400 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
