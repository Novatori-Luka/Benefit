'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { MagazineIssue } from '@/types';

const schema = z.object({
  issue_number: z.number().min(1),
  title_en: z.string().min(1),
  title_ka: z.string().min(1),
  cover_image_url: z.string().url().or(z.literal('')),
  pdf_url: z.string().url().or(z.literal('')),
  published_date: z.string().min(1),
  topics_en: z.string(),
  topics_ka: z.string(),
  is_published: z.boolean(),
});
type IssueForm = z.infer<typeof schema>;

export default function AdminMagazine() {
  const [issues, setIssues] = useState<MagazineIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<IssueForm>({
    resolver: zodResolver(schema),
    defaultValues: { is_published: false, issue_number: 1 },
  });

  const fetchIssues = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from('magazine_issues').select('*').order('issue_number', { ascending: false });
    setIssues(data ?? []);
    setLoading(false);
  };
  useEffect(() => { fetchIssues(); }, []);

  const onSubmit = async (data: IssueForm) => {
    const supabase = createClient();
    const { error } = await supabase.from('magazine_issues').insert({
      ...data,
      topics_en: data.topics_en.split(',').map((s) => s.trim()),
      topics_ka: data.topics_ka.split(',').map((s) => s.trim()),
    });
    if (error) return toast.error(error.message);
    toast.success('Issue added!');
    setShowForm(false);
    reset();
    fetchIssues();
  };

  const togglePublish = async (issue: MagazineIssue) => {
    const supabase = createClient();
    await supabase.from('magazine_issues').update({ is_published: !issue.is_published }).eq('id', issue.id);
    fetchIssues();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this issue?')) return;
    const supabase = createClient();
    await supabase.from('magazine_issues').delete().eq('id', id);
    toast.success('Deleted!');
    fetchIssues();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-playfair text-3xl font-bold text-white uppercase">Magazine Issues</h1>
        <button onClick={() => setShowForm(!showForm)} className="admin-btn flex items-center gap-2">
          <Plus size={14} /> New Issue
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="border border-white/10 p-8 mb-8 space-y-4 max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Issue #</label>
              <input {...register('issue_number', { valueAsNumber: true })} type="number" className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Published Date</label>
              <input {...register('published_date')} type="date" className="admin-input" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Title (EN)</label>
              <input {...register('title_en')} className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Title (KA)</label>
              <input {...register('title_ka')} className="admin-input" />
            </div>
          </div>
          <div>
            <label className="admin-label">Cover Image URL</label>
            <input {...register('cover_image_url')} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">PDF URL (Supabase Storage)</label>
            <input {...register('pdf_url')} className="admin-input" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Topics EN (comma separated)</label>
              <input {...register('topics_en')} className="admin-input" placeholder="Business, Fashion, Hotels" />
            </div>
            <div>
              <label className="admin-label">Topics KA (comma separated)</label>
              <input {...register('topics_ka')} className="admin-input" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="pub" {...register('is_published')} className="accent-white" />
            <label htmlFor="pub" className="text-white/60 text-xs tracking-widest uppercase">Publish immediately</label>
          </div>
          <button type="submit" disabled={isSubmitting} className="admin-btn">
            {isSubmitting ? 'Adding...' : 'Add Issue'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="space-y-2">{[...Array(4)].map((_, i) => <div key={i} className="skeleton h-14" />)}</div>
      ) : (
        <div className="border border-white/10 divide-y divide-white/10">
          {issues.map((issue) => (
            <div key={issue.id} className="flex items-center justify-between p-4 hover:bg-white/5">
              <div>
                <p className="text-white text-sm font-medium">Issue #{issue.issue_number} — {issue.title_en}</p>
                <p className="text-white/30 text-xs mt-1">{issue.published_date}</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => togglePublish(issue)} className="text-white/30 hover:text-white transition-colors">
                  {issue.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button onClick={() => handleDelete(issue.id)} className="text-white/30 hover:text-red-400 transition-colors">
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
