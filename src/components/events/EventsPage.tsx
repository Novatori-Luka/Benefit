'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { ArrowRight, Calendar, MapPin, Users, X } from 'lucide-react';
import SectionHero from '@/components/shared/SectionHero';
import FadeUp from '@/components/ui/FadeUp';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const upcoming = [
  {
    id: 1,
    title: 'BENEFIT Business Summit 2025',
    date: 'March 15, 2025',
    venue: 'Radisson Blu Iveria, Tbilisi',
    capacity: 200,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    speakers: ['David Kezerashvili', 'Nino Guruli', 'Archil Mestvirishvili'],
  },
  {
    id: 2,
    title: 'BENEFIT Fashion & Lifestyle Forum',
    date: 'April 28, 2025',
    venue: 'Moxy Hotel, Tbilisi',
    capacity: 150,
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
    speakers: ['Ana Tkeshelashvili', 'George Modebadze'],
  },
];

const past = [
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&q=70',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&q=70',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&q=70',
  'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400&q=70',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70',
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&q=70',
];

const regSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(1),
  position: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  event_id: z.string().min(1),
});
type RegForm = z.infer<typeof regSchema>;

export default function EventsPage() {
  const t = useTranslations('events');
  const locale = useLocale();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<RegForm>({
    resolver: zodResolver(regSchema),
  });

  const openModal = (id: number) => {
    setSelectedEvent(id);
    setModalOpen(true);
  };

  const onSubmit = async (data: RegForm) => {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success('Registration complete!');
        reset();
        setModalOpen(false);
      }
    } catch {
      toast.error('Something went wrong.');
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <SectionHero
        label="BENEFIT TALKS"
        title={t('hero_title')}
        subtitle={t('hero_sub')}
      />

      {/* Upcoming Events */}
      <section className="py-24 md:py-36 border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <FadeUp>
            <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-16">{t('upcoming')}</p>
          </FadeUp>
          <div className="space-y-px bg-white/10">
            {upcoming.map((event, i) => (
              <FadeUp key={event.id} delay={i * 0.1} className="bg-black">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative aspect-video lg:aspect-auto overflow-hidden img-zoom">
                    <Image src={event.image} alt={event.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>
                  <div className="p-10 md:p-14 flex flex-col justify-between">
                    <div>
                      <h3 className="font-playfair text-3xl md:text-4xl font-bold text-white uppercase mb-6">
                        {event.title}
                      </h3>
                      <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-3 text-white/50 text-xs tracking-wide">
                          <Calendar size={14} strokeWidth={1} />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/50 text-xs tracking-wide">
                          <MapPin size={14} strokeWidth={1} />
                          <span>{event.venue}</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/50 text-xs tracking-wide">
                          <Users size={14} strokeWidth={1} />
                          <span>{event.capacity} guests</span>
                        </div>
                      </div>
                      <div className="mb-8">
                        <p className="text-white/30 text-xs tracking-widest uppercase mb-3">Speakers</p>
                        <div className="flex flex-wrap gap-2">
                          {event.speakers.map((s) => (
                            <span key={s} className="border border-white/20 px-3 py-1 text-white/60 text-xs tracking-wide">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => openModal(event.id)}
                      className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white/90 transition-colors w-fit"
                    >
                      {t('register')}
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events masonry */}
      <section className="py-24 md:py-36 border-b border-white/10 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <FadeUp>
            <p className="text-black/30 text-xs tracking-[0.4em] uppercase mb-16">{t('past')}</p>
          </FadeUp>
          <div className="columns-2 md:columns-3 gap-px">
            {past.map((img, i) => (
              <FadeUp key={i} delay={i * 0.07} className="mb-px break-inside-avoid">
                <div className="relative overflow-hidden img-zoom">
                  <Image
                    src={img}
                    alt={`Past event ${i + 1}`}
                    width={400}
                    height={i % 3 === 1 ? 500 : 300}
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors" />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Event Partner CTA */}
      <section className="bg-black py-28 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <FadeUp>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white uppercase mb-6">
              {t('partner_cta_title')}
            </h2>
            <p className="text-white/50 text-sm tracking-wide mb-10">{t('partner_cta_sub')}</p>
            <a
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black hover:border-white transition-all"
            >
              Get in Touch <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </FadeUp>
        </div>
      </section>

      {/* Registration Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-6">
          <div className="bg-black border border-white/15 max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-8 border-b border-white/10">
              <h3 className="font-playfair text-xl font-bold text-white uppercase">{t('modal.title')}</h3>
              <button onClick={() => setModalOpen(false)} className="text-white/50 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-4">
              <input type="hidden" value={selectedEvent ?? ''} {...register('event_id')} />
              {(['name', 'company', 'position', 'email', 'phone'] as const).map((field) => (
                <div key={field}>
                  <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">
                    {t(`modal.${field}` as any)}
                  </label>
                  <input
                    {...register(field)}
                    type={field === 'email' ? 'email' : 'text'}
                    className="w-full bg-transparent border border-white/20 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50 placeholder:text-white/20"
                    placeholder={t(`modal.${field}` as any)}
                  />
                  {errors[field] && <p className="text-red-400 text-xs mt-1">{errors[field]?.message}</p>}
                </div>
              ))}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black py-4 text-xs tracking-[0.2em] uppercase mt-4 hover:bg-white/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : t('modal.submit')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
