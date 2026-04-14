import { createClient } from '@/lib/supabase/server';
import { BookOpen, FileText, Calendar, Handshake, MessageSquare, Users } from 'lucide-react';

async function getStat(table: string): Promise<number> {
  const supabase = await createClient();
  const { count } = await supabase.from(table).select('*', { count: 'exact', head: true });
  return count ?? 0;
}

export default async function AdminDashboard() {
  const [articles, issues, events, partners, messages, subscribers] = await Promise.all([
    getStat('articles'),
    getStat('magazine_issues'),
    getStat('events'),
    getStat('partners'),
    getStat('contact_messages'),
    getStat('newsletter_subscribers'),
  ]);

  const stats = [
    { label: 'Articles', value: articles, icon: FileText, href: '/admin/blog' },
    { label: 'Issues', value: issues, icon: BookOpen, href: '/admin/magazine' },
    { label: 'Events', value: events, icon: Calendar, href: '/admin/events' },
    { label: 'Partners', value: partners, icon: Handshake, href: '/admin/partners' },
    { label: 'Messages', value: messages, icon: MessageSquare, href: '/admin/messages' },
    { label: 'Subscribers', value: subscribers, icon: Users, href: '/admin/newsletter' },
  ];

  return (
    <div>
      <h1 className="font-playfair text-3xl font-bold text-white uppercase mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <a key={stat.label} href={stat.href} className="bg-black p-8 hover:bg-white/5 transition-colors group">
              <Icon size={20} className="text-white/30 mb-4 group-hover:text-white/60 transition-colors" strokeWidth={1} />
              <p className="font-playfair text-4xl font-bold text-white">{stat.value}</p>
              <p className="text-white/40 text-xs tracking-widest uppercase mt-2">{stat.label}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
