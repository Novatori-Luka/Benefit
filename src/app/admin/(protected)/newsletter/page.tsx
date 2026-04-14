'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Download } from 'lucide-react';
import type { NewsletterSubscriber } from '@/types';

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('created_at', { ascending: false });
      setSubscribers(data ?? []);
      setLoading(false);
    })();
  }, []);

  const exportCSV = () => {
    const csv = ['Email,Date'].concat(
      subscribers.map((s) => `${s.email},${s.created_at}`)
    ).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'subscribers.csv'; a.click();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-white uppercase">Newsletter</h1>
          <p className="text-white/30 text-sm mt-1">{subscribers.length} active subscribers</p>
        </div>
        <button onClick={exportCSV} className="admin-btn flex items-center gap-2">
          <Download size={14} /> Export CSV
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">{[...Array(8)].map((_, i) => <div key={i} className="skeleton h-10" />)}</div>
      ) : (
        <div className="border border-white/10 divide-y divide-white/10">
          {subscribers.map((sub) => (
            <div key={sub.id} className="flex items-center justify-between px-4 py-3 hover:bg-white/5">
              <span className="text-white text-sm">{sub.email}</span>
              <span className="text-white/30 text-xs">{new Date(sub.created_at).toLocaleDateString()}</span>
            </div>
          ))}
          {subscribers.length === 0 && <p className="text-white/30 text-sm text-center py-12">No subscribers yet.</p>}
        </div>
      )}
    </div>
  );
}
