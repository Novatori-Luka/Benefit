'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Download } from 'lucide-react';
import type { EventRegistration } from '@/types';

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('event_registrations')
        .select('*')
        .order('created_at', { ascending: false });
      setRegistrations(data ?? []);
      setLoading(false);
    })();
  }, []);

  const exportCSV = () => {
    const csv = ['Name,Company,Position,Email,Phone,Date'].concat(
      registrations.map((r) => `${r.name},${r.company},${r.position},${r.email},${r.phone},${r.created_at}`)
    ).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'registrations.csv'; a.click();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-white uppercase">Registrations</h1>
          <p className="text-white/30 text-sm mt-1">{registrations.length} total registrations</p>
        </div>
        <button onClick={exportCSV} className="admin-btn flex items-center gap-2">
          <Download size={14} /> Export CSV
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">{[...Array(6)].map((_, i) => <div key={i} className="skeleton h-12" />)}</div>
      ) : (
        <div className="border border-white/10 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {['Name', 'Company', 'Position', 'Email', 'Phone', 'Date'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-white/30 text-xs tracking-widest uppercase font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {registrations.map((r) => (
                <tr key={r.id} className="hover:bg-white/5">
                  <td className="px-4 py-3 text-white">{r.name}</td>
                  <td className="px-4 py-3 text-white/60">{r.company}</td>
                  <td className="px-4 py-3 text-white/60">{r.position}</td>
                  <td className="px-4 py-3 text-white/60">{r.email}</td>
                  <td className="px-4 py-3 text-white/60">{r.phone}</td>
                  <td className="px-4 py-3 text-white/30 text-xs">{new Date(r.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {registrations.length === 0 && <p className="text-white/30 text-sm text-center py-12">No registrations yet.</p>}
        </div>
      )}
    </div>
  );
}
