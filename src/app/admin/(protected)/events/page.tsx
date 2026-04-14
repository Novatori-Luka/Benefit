'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Event } from '@/types';

const schema = z.object({
  title_en: z.string().min(1), title_ka: z.string().min(1),
  description_en: z.string().min(1), description_ka: z.string().min(1),
  date: z.string().min(1), venue_en: z.string().min(1), venue_ka: z.string().min(1),
  cover_image_url: z.string().url().or(z.literal('')),
  capacity: z.number().min(1),
  is_registration_open: z.boolean(), is_published: z.boolean(),
});
type EventForm = z.infer<typeof schema>;

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<EventForm>({
    resolver: zodResolver(schema),
    defaultValues: { is_registration_open: true, is_published: false, capacity: 100 },
  });

  const fetchEvents = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from('events').select('*').order('date', { ascending: false });
    setEvents(data ?? []);
    setLoading(false);
  };
  useEffect(() => { fetchEvents(); }, []);

  const onSubmit = async (data: EventForm) => {
    const supabase = createClient();
    const { error } = await supabase.from('events').insert(data);
    if (error) return toast.error(error.message);
    toast.success('Event created!');
    setShowForm(false); reset(); fetchEvents();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    const supabase = createClient();
    await supabase.from('events').delete().eq('id', id);
    toast.success('Deleted!'); fetchEvents();
  };

  const togglePublish = async (event: Event) => {
    const supabase = createClient();
    await supabase.from('events').update({ is_published: !event.is_published }).eq('id', event.id);
    fetchEvents();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-playfair text-3xl font-bold text-white uppercase">Events</h1>
        <button onClick={() => setShowForm(!showForm)} className="admin-btn flex items-center gap-2">
          <Plus size={14} /> New Event
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="border border-white/10 p-8 mb-8 space-y-4 max-w-3xl">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="admin-label">Title (EN)</label><input {...register('title_en')} className="admin-input" /></div>
            <div><label className="admin-label">Title (KA)</label><input {...register('title_ka')} className="admin-input" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="admin-label">Description (EN)</label><textarea {...register('description_en')} rows={3} className="admin-input resize-none" /></div>
            <div><label className="admin-label">Description (KA)</label><textarea {...register('description_ka')} rows={3} className="admin-input resize-none" /></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className="admin-label">Date</label><input {...register('date')} type="datetime-local" className="admin-input" /></div>
            <div><label className="admin-label">Venue (EN)</label><input {...register('venue_en')} className="admin-input" /></div>
            <div><label className="admin-label">Venue (KA)</label><input {...register('venue_ka')} className="admin-input" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="admin-label">Cover Image URL</label><input {...register('cover_image_url')} className="admin-input" /></div>
            <div><label className="admin-label">Capacity</label><input {...register('capacity', { valueAsNumber: true })} type="number" className="admin-input" /></div>
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-white/60 text-xs tracking-widest uppercase">
              <input type="checkbox" {...register('is_registration_open')} className="accent-white" /> Registration Open
            </label>
            <label className="flex items-center gap-2 text-white/60 text-xs tracking-widest uppercase">
              <input type="checkbox" {...register('is_published')} className="accent-white" /> Publish
            </label>
          </div>
          <button type="submit" disabled={isSubmitting} className="admin-btn">{isSubmitting ? 'Saving...' : 'Create Event'}</button>
        </form>
      )}

      {loading ? (
        <div className="space-y-2">{[...Array(4)].map((_, i) => <div key={i} className="skeleton h-14" />)}</div>
      ) : (
        <div className="border border-white/10 divide-y divide-white/10">
          {events.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-4 hover:bg-white/5">
              <div>
                <p className="text-white text-sm font-medium">{event.title_en}</p>
                <p className="text-white/30 text-xs mt-1">{new Date(event.date).toLocaleDateString()} · {event.venue_en}</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => togglePublish(event)} className="text-white/30 hover:text-white">
                  {event.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button onClick={() => handleDelete(event.id)} className="text-white/30 hover:text-red-400">
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
