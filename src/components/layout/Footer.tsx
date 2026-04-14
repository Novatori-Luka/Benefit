'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Globe, Link2, Play } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const year = new Date().getFullYear();

  const localizedHref = (href: string) => `/${locale}${href}`;

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href={localizedHref('/')} className="font-playfair text-3xl font-bold tracking-widest text-white uppercase">
              BENEFIT
            </Link>
            <p className="mt-4 text-white/40 text-xs tracking-wide leading-relaxed max-w-xs">
              Premium Business & Lifestyle Media Platform.<br />Tbilisi, Georgia.
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { icon: Globe, href: '#' },
                { icon: Link2, href: '#' },
                { icon: Play, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="text-white/30 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs tracking-widest uppercase text-white/30 mb-6">Navigation</p>
            <ul className="space-y-3">
              {['magazine', 'events', 'digital', 'blog'].map((key) => (
                <li key={key}>
                  <Link
                    href={localizedHref(`/${key}`)}
                    className="text-sm text-white/60 hover:text-white transition-colors tracking-wide underline-reveal"
                  >
                    {t(key as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs tracking-widest uppercase text-white/30 mb-6">Company</p>
            <ul className="space-y-3">
              {['partners', 'contact'].map((key) => (
                <li key={key}>
                  <Link
                    href={localizedHref(`/${key}`)}
                    className="text-sm text-white/60 hover:text-white transition-colors tracking-wide underline-reveal"
                  >
                    {t(key as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs tracking-widest uppercase text-white/30 mb-6">Contact</p>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@benefit.ge" className="text-sm text-white/60 hover:text-white transition-colors tracking-wide underline-reveal">
                  hello@benefit.ge
                </a>
              </li>
              <li>
                <span className="text-sm text-white/60 tracking-wide">Tbilisi, Georgia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider mt-16 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs tracking-wide">
            © {year} BENEFIT Magazine. All rights reserved.
          </p>
          <p className="text-white/20 text-xs tracking-wide">
            Georgia's Premium Media Platform
          </p>
        </div>
      </div>
    </footer>
  );
}
