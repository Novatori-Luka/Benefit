'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Partner } from '@/types';

const schema = z.object({
  company_name: z.string().min(1),
  logo_url: z.string().url().or(z.literal('')),
  website_url: z.string().url().or(z.literal('')),
  tier: z.enum(['print', 'event', 'full']),
  category: z.string().min(1),
  order_index: z.number(),
  is_visible: z.boolean(),
});
type PartnerForm = z.infer<typeof schema>;

export default function AdminPartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<PartnerForm>({
    resolver: zodResolver(schema),
    defaultValues: { tier: 'print', is_visible: true, order_index: 0 },
  });

  const fetchPartners = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from('partners').select('*').order('order_index');
    setPartners(data ?? []);
    setLoading(false);
  };
  useEffect(() => { fetchPartners(); }, []);

  const onSubmit = async (data: PartnerForm) => {
    const supabase = createClient();
    const { error } = await supabase.from('partners').insert(data);
    if (error) return toast.error(error.message);
    toast.success('Partner added!');
    setShowForm(false); reset(); fetchPartners();
  };

  const toggleVisible = async (partner: Partner) => {
    const supabase = createClient();
    await supabase.from('partners').update({ is_visible: !partner.is_visible }).eq('id', partner.id);
    fetchPartners();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    const supabase = createClient();
    await supabase.from('partners').delete().eq('id', id);
    toast.success('Deleted!'); fetchPartners();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-playfair text-3xl font-bold text-white uppercase">Partners</h1>
        <button onClick={() => setShowForm(!showForm)} className="admin-btn flex items-center gap-2">
          <Plus size={14} /> Add Partner
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="border border-white/10 p-8 mb-8 space-y-4 max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="admin-label">Company Name</label><input {...register('company_name')} className="admin-input" /></div>
            <div><label className="admin-label">Category</label><input {...register('category')} className="admin-input" placeholder="FINANCE, HOSPITALITY..." /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="admin-label">Logo URL</label><input {...register('logo_url')} className="admin-input" /></div>
            <div><label className="admin-label">Website URL</label><input {...register('website_url')} className="admin-input" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Tier</label>
              <select {...register('tier')} className="admin-select">
                <option value="print">Print Presence</option>
                <option value="event">Event Presence</option>
                <option value="full">Full Ecosystem</option>
              </select>
            </div>
            <div><label className="admin-label">Order Index</label><input {...register('order_index', { valueAsNumber: true })} type="number" className="admin-input" /></div>
          </div>
          <label className="flex items-center gap-2 text-white/60 text-xs tracking-widest uppercase">
            <input type="checkbox" {...register('is_visible')} className="accent-white" /> Visible
          </label>
          <button type="submit" disabled={isSubmitting} className="admin-btn">{isSubmitting ? 'Adding...' : 'Add Partner'}</button>
        </form>
      )}

      {loading ? (
        <div className="space-y-2">{[...Array(6)].map((_, i) => <div key={i} className="skeleton h-12" />)}</div>
      ) : (
        <div className="border border-white/10 divide-y divide-white/10">
          {partners.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-4 hover:bg-white/5">
              <div>
                <p className="text-white text-sm font-medium">{p.company_name}</p>
                <div className="flex gap-3 mt-1">
                  <span className="text-white/30 text-xs tracking-widest uppercase">{p.tier}</span>
                  <span className="text-white/20 text-xs">{p.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => toggleVisible(p)} className="text-white/30 hover:text-white">
                  {p.is_visible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button onClick={() => handleDelete(p.id)} className="text-white/30 hover:text-red-400">
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
