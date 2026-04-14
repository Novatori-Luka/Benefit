'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight, Award, Globe, Zap, Target } from 'lucide-react';
import SectionHero from '@/components/shared/SectionHero';
import FadeUp from '@/components/ui/FadeUp';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const allPartners = [
  { name: 'TBC BANK', category: 'FINANCE' },
  { name: 'BANK OF GEORGIA', category: 'FINANCE' },
  { name: 'RADISSON BLU', category: 'HOSPITALITY' },
  { name: 'MARRIOTT', category: 'HOSPITALITY' },
  { name: 'HILTON', category: 'HOSPITALITY' },
  { name: 'GEORGIAN AIRWAYS', category: 'TRANSPORT' },
  { name: 'ADJARA GROUP', category: 'HOSPITALITY' },
  { name: 'WISSOL', category: 'ENERGY' },
  { name: 'NOVA', category: 'TELECOM' },
  { name: 'FORMULA', category: 'TELECOM' },
  { name: 'COURTYARD', category: 'HOSPITALITY' },
  { name: 'BURGERS.GE', category: 'FOOD' },
];

const FILTER_CATS = ['ALL', 'FINANCE', 'HOSPITALITY', 'TRANSPORT', 'TELECOM', 'ENERGY', 'FOOD'];

const tiers = [
  {
    key: 'tier_print' as const,
    features: ['Full-page magazine placement', 'Cover story opportunity', 'Digital mention', 'Quarterly newsletter'],
  },
  {
    key: 'tier_event' as const,
    features: ['Event logo placement', 'VIP table (2 events)', 'On-stage mention', 'Social media coverage'],
    featured: true,
  },
  {
    key: 'tier_full' as const,
    features: ['All print benefits', 'All event benefits', 'Digital campaigns', 'Video production', 'Priority placement'],
  },
];

const whyPoints = [
  { icon: Target, title: 'Premium Audience', desc: 'Reach Georgia\'s top business decision-makers, C-suite executives, and affluent consumers.' },
  { icon: Globe, title: 'Omnichannel Presence', desc: 'Print, digital, social, and live events — your brand everywhere that matters.' },
  { icon: Award, title: 'Editorial Authority', desc: 'Be associated with Georgia\'s most trusted business media brand.' },
  { icon: Zap, title: 'Measurable Impact', desc: 'Data-backed reporting on reach, engagement, and brand recall.' },
];

const appSchema = z.object({
  company_name: z.string().min(2),
  industry: z.string().min(1),
  contact_person: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  partnership_interest: z.array(z.string()).min(1),
  message: z.string().min(10),
});
type AppForm = z.infer<typeof appSchema>;

export default function PartnersPage() {
  const t = useTranslations('partners');
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filtered = activeFilter === 'ALL'
    ? allPartners
    : allPartners.filter((p) => p.category === activeFilter);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<AppForm>({
    resolver: zodResolver(appSchema),
    defaultValues: { partnership_interest: [] },
  });

  const onSubmit = async (data: AppForm) => {
    try {
      const res = await fetch('/api/partner-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success('Application submitted!');
        reset();
      }
    } catch {
      toast.error('Something went wrong.');
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <SectionHero
        title={t('hero_title')}
        subtitle={t('hero_sub')}
      />

      {/* Partner logos grid */}
      <section className="py-24 md:py-36 border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          {/* Filter */}
          <FadeUp>
            <div className="flex gap-6 overflow-x-auto mb-16">
              {FILTER_CATS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`text-xs tracking-[0.25em] uppercase whitespace-nowrap transition-colors pb-1 ${
                    activeFilter === cat ? 'text-white border-b border-white' : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeUp>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-white/10">
            {filtered.map((p, i) => (
              <FadeUp key={p.name} delay={i * 0.05} className="bg-black">
                <div className="flex flex-col items-center justify-center p-8 md:p-10 group">
                  <p className="font-inter font-semibold text-white/30 text-sm tracking-[0.25em] uppercase group-hover:text-white/70 transition-colors">
                    {p.name}
                  </p>
                  <p className="text-white/15 text-[10px] tracking-widest uppercase mt-2">{p.category}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="bg-white border-b border-black/10 py-24 md:py-36">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <FadeUp>
            <p className="text-black/30 text-xs tracking-[0.4em] uppercase mb-16 text-center">
              {t('tiers_title')}
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10">
            {tiers.map((tier, i) => (
              <FadeUp key={tier.key} delay={i * 0.1} className={tier.featured ? 'bg-black' : 'bg-white'}>
                <div className={`p-10 md:p-12 h-full flex flex-col ${tier.featured ? 'text-white' : 'text-black'}`}>
                  {tier.featured && (
                    <span className="text-white/30 text-xs tracking-widest uppercase mb-4 block">Popular</span>
                  )}
                  <h3 className={`font-playfair text-2xl font-bold uppercase mb-8 ${tier.featured ? 'text-white' : 'text-black'}`}>
                    {t(tier.key)}
                  </h3>
                  <ul className="space-y-4 flex-1 mb-10">
                    {tier.features.map((f) => (
                      <li key={f} className={`flex items-start gap-3 text-sm tracking-wide ${tier.featured ? 'text-white/60' : 'text-black/60'}`}>
                        <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${tier.featured ? 'bg-white/40' : 'bg-black/40'}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#apply"
                    className={`inline-flex items-center gap-2 text-xs tracking-widest uppercase border py-3 px-6 transition-all group ${
                      tier.featured
                        ? 'border-white/30 text-white hover:bg-white hover:text-black hover:border-white'
                        : 'border-black/30 text-black hover:bg-black hover:text-white hover:border-black'
                    }`}
                  >
                    {t('contact_detail')}
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="bg-black border-b border-white/10 py-24 md:py-36">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <FadeUp>
            <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-16">{t('why_title')}</p>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {whyPoints.map((pt, i) => {
              const Icon = pt.icon;
              return (
                <FadeUp key={i} delay={i * 0.1} className="bg-black">
                  <div className="p-8 md:p-10 group">
                    <Icon size={22} className="text-white/30 mb-6 group-hover:text-white transition-colors" strokeWidth={1} />
                    <h4 className="font-playfair text-xl font-bold text-white uppercase mb-3">{pt.title}</h4>
                    <p className="text-white/40 text-sm leading-relaxed tracking-wide">{pt.desc}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="bg-black py-24 md:py-36">
        <div className="max-w-2xl mx-auto px-6 md:px-12">
          <FadeUp>
            <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-4 text-center">{t('why_title')}</p>
            <h2 className="font-playfair text-4xl font-bold text-white uppercase text-center mb-16">
              {t('form_title')}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {(['company_name', 'industry', 'contact_person', 'email', 'phone'] as const).map((field) => (
                  <div key={field} className="">
                    <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">
                      {t(`form.${field === 'company_name' ? 'company' : field === 'contact_person' ? 'contact_person' : field}` as any)}
                    </label>
                    <input
                      {...register(field)}
                      type={field === 'email' ? 'email' : 'text'}
                      className="w-full bg-transparent border border-white/20 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50 placeholder:text-white/20"
                    />
                    {errors[field] && <p className="text-red-400 text-xs mt-1">{errors[field]?.message}</p>}
                  </div>
                ))}
              </div>

              {/* Partnership interest checkboxes */}
              <div>
                <label className="text-white/40 text-xs tracking-widest uppercase block mb-3">{t('form.interest')}</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {([t('tier_print'), t('tier_event'), t('tier_full')] as string[]).map((tier) => (
                    <label key={tier} className="flex items-center gap-3 border border-white/20 px-4 py-3 hover:border-white/40 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        value={tier}
                        {...register('partnership_interest')}
                        className="accent-white"
                      />
                      <span className="text-white/60 text-xs tracking-wide">{tier}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">{t('form.message')}</label>
                <textarea
                  {...register('message')}
                  rows={4}
                  className="w-full bg-transparent border border-white/20 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50 placeholder:text-white/20 resize-none"
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message?.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black py-4 text-xs tracking-[0.25em] uppercase hover:bg-white/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : t('form_submit')}
              </button>
            </form>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
