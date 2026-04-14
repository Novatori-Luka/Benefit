'use client';

import { useTranslations } from 'next-intl';
import { Mail, MapPin, Globe, Link2 } from 'lucide-react';
import FadeUp from '@/components/ui/FadeUp';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10),
});
type ContactForm = z.infer<typeof schema>;

export default function ContactPage() {
  const t = useTranslations('contact');

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ContactForm) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success('Message sent!');
        reset();
      }
    } catch {
      toast.error('Something went wrong.');
    }
  };

  return (
    <div className="bg-black min-h-screen pt-32 md:pt-40 pb-24">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: info */}
          <div>
            <FadeUp>
              <h1 className="font-playfair text-[clamp(3rem,8vw,6rem)] font-bold text-white uppercase leading-none mb-12">
                {t('title')}
              </h1>
            </FadeUp>
            <div className="divider mb-12" />

            <FadeUp delay={0.1}>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin size={16} className="text-white/30 mt-1 flex-shrink-0" strokeWidth={1} />
                  <div>
                    <p className="text-white/30 text-xs tracking-widest uppercase mb-1">Address</p>
                    <p className="text-white/70 text-sm tracking-wide">{t('address')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail size={16} className="text-white/30 mt-1 flex-shrink-0" strokeWidth={1} />
                  <div>
                    <p className="text-white/30 text-xs tracking-widest uppercase mb-1">Email</p>
                    <a
                      href="mailto:hello@benefit.ge"
                      className="text-white/70 text-sm tracking-wide hover:text-white transition-colors underline-reveal"
                    >
                      hello@benefit.ge
                    </a>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="flex gap-4 mt-12">
                {[
                  { icon: Globe, href: '#', label: 'Instagram' },
                  { icon: Link2, href: '#', label: 'LinkedIn' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-2 text-white/30 hover:text-white transition-colors text-xs tracking-widest uppercase"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={16} strokeWidth={1} />
                    {label}
                  </a>
                ))}
              </div>
            </FadeUp>

            {/* Map */}
            <FadeUp delay={0.2}>
              <div className="mt-12 aspect-[4/3] border border-white/10 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95993.72085434264!2d44.71152!3d41.69411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cd7e2d1e4b1%3A0x4d4cd5d8a63b6a58!2sTbilisi%2C%20Georgia!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(100%) invert(1)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </FadeUp>
          </div>

          {/* Right: form */}
          <div>
            <FadeUp delay={0.05}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">{t('form.name')}</label>
                    <input
                      {...register('name')}
                      className="w-full bg-transparent border border-white/20 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50 placeholder:text-white/20"
                      placeholder="Your Name"
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">{t('form.email')}</label>
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full bg-transparent border border-white/20 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50 placeholder:text-white/20"
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">{t('form.subject')}</label>
                  <select
                    {...register('subject')}
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white/70 text-sm focus:outline-none focus:border-white/50 appearance-none"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">{t('form.subjects.general')}</option>
                    <option value="partnership">{t('form.subjects.partnership')}</option>
                    <option value="advertising">{t('form.subjects.advertising')}</option>
                    <option value="events">{t('form.subjects.events')}</option>
                    <option value="other">{t('form.subjects.other')}</option>
                  </select>
                  {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">{t('form.message')}</label>
                  <textarea
                    {...register('message')}
                    rows={6}
                    className="w-full bg-transparent border border-white/20 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50 placeholder:text-white/20 resize-none"
                    placeholder="Your message..."
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black py-4 text-xs tracking-[0.25em] uppercase hover:bg-white/90 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : t('form.submit')}
                </button>
              </form>
            </FadeUp>
          </div>
        </div>
      </div>
    </div>
  );
}
