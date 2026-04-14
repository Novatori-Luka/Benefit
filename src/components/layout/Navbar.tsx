'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { key: 'magazine', href: '/magazine' },
  { key: 'events', href: '/events' },
  { key: 'digital', href: '/digital' },
  { key: 'blog', href: '/blog' },
  { key: 'partners', href: '/partners' },
  { key: 'contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const localizedHref = (href: string) => `/${locale}${href}`;
  const otherLocale = locale === 'ka' ? 'en' : 'ka';
  const localeSwitchHref = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'bg-black border-b border-white/10' : 'bg-transparent'
        )}
      >
        <nav className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href={localizedHref('/')}
            className="font-playfair text-xl md:text-2xl font-bold tracking-widest text-white uppercase underline-reveal"
          >
            BENEFIT
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.key}>
                <Link
                  href={localizedHref(link.href)}
                  className="text-xs tracking-widest uppercase text-white/70 hover:text-white transition-colors duration-300 underline-reveal"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right: lang switcher + hamburger */}
          <div className="flex items-center gap-6">
            <Link
              href={localeSwitchHref}
              className="hidden md:block text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors border border-white/20 px-3 py-1 hover:border-white/60"
            >
              {otherLocale.toUpperCase()}
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden text-white p-1"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 h-16">
              <Link href={localizedHref('/')} className="font-playfair text-xl font-bold tracking-widest text-white uppercase">
                BENEFIT
              </Link>
              <button onClick={() => setMenuOpen(false)} className="text-white" aria-label="Close menu">
                <X size={22} />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col justify-center px-8">
              <div className="divider mb-12" />
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  <Link
                    href={localizedHref(link.href)}
                    className="block font-playfair text-4xl font-bold text-white uppercase py-4 border-b border-white/10 hover:text-white/70 transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-10">
                <Link
                  href={localeSwitchHref}
                  className="text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors border border-white/20 px-3 py-1 hover:border-white/60 inline-block"
                >
                  {otherLocale.toUpperCase()}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
