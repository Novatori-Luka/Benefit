'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  LayoutDashboard, BookOpen, FileText, Calendar,
  Handshake, MessageSquare, Mail, Users, LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { href: '/admin/magazine', icon: BookOpen, label: 'Magazine' },
  { href: '/admin/blog', icon: FileText, label: 'Blog' },
  { href: '/admin/events', icon: Calendar, label: 'Events' },
  { href: '/admin/partners', icon: Handshake, label: 'Partners' },
  { href: '/admin/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/admin/newsletter', icon: Mail, label: 'Newsletter' },
  { href: '/admin/registrations', icon: Users, label: 'Registrations' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-black border-r border-white/10 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <p className="font-playfair text-lg font-bold text-white uppercase tracking-widest">BENEFIT</p>
        <p className="text-white/30 text-xs tracking-widest uppercase mt-1">Admin</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 text-xs tracking-widest uppercase transition-colors',
                isActive
                  ? 'bg-white text-black'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon size={14} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-xs tracking-widest uppercase text-white/30 hover:text-white transition-colors w-full"
        >
          <LogOut size={14} />
          Log Out
        </button>
      </div>
    </aside>
  );
}
