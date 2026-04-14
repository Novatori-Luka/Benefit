'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { CheckCircle } from 'lucide-react';
import type { ContactMessage } from '@/types';

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    setMessages(data ?? []);
    setLoading(false);
  };
  useEffect(() => { fetchMessages(); }, []);

  const markRead = async (id: string) => {
    const supabase = createClient();
    await supabase.from('contact_messages').update({ is_read: true }).eq('id', id);
    fetchMessages();
  };

  return (
    <div>
      <h1 className="font-playfair text-3xl font-bold text-white uppercase mb-8">Messages</h1>

      {loading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="skeleton h-24" />)}</div>
      ) : (
        <div className="space-y-px">
          {messages.map((msg) => (
            <div key={msg.id} className={`border border-white/10 p-6 hover:bg-white/5 ${!msg.is_read ? 'border-l-2 border-l-white' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-white font-medium text-sm">{msg.name}</p>
                  <p className="text-white/40 text-xs mt-1">{msg.email} · {msg.subject}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/20 text-xs">{new Date(msg.created_at).toLocaleDateString()}</span>
                  {!msg.is_read && (
                    <button onClick={() => markRead(msg.id)} className="text-white/30 hover:text-white" title="Mark as read">
                      <CheckCircle size={16} />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{msg.message}</p>
            </div>
          ))}
          {messages.length === 0 && <p className="text-white/30 text-sm text-center py-12">No messages yet.</p>}
        </div>
      )}
    </div>
  );
}
