import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const supabase = await createClient();

    // Check if already subscribed
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id, is_active')
      .eq('email', email)
      .single();

    if (existing) {
      if (existing.is_active) {
        return NextResponse.json({ message: 'Already subscribed' });
      }
      // Reactivate
      await supabase.from('newsletter_subscribers').update({ is_active: true }).eq('email', email);
      return NextResponse.json({ success: true });
    }

    const { error } = await supabase.from('newsletter_subscribers').insert({ email, is_active: true });
    if (error) throw error;

    // Send welcome email via Resend
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: `BENEFIT Magazine <${process.env.RESEND_FROM_EMAIL || 'noreply@benefit.ge'}>`,
        to: email,
        subject: 'Welcome to BENEFIT Magazine',
        html: `<div style="font-family:sans-serif;max-width:500px;margin:0 auto;background:#000;color:#fff;padding:40px;">
          <h1 style="font-size:32px;font-weight:bold;letter-spacing:0.1em;">BENEFIT</h1>
          <p style="color:rgba(255,255,255,0.6);margin-top:20px;">Thank you for subscribing to Georgia's premium business & lifestyle magazine.</p>
          <p style="color:rgba(255,255,255,0.4);font-size:12px;margin-top:40px;">You'll receive our quarterly issues and curated content directly to your inbox.</p>
        </div>`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
