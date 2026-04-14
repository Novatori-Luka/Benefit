import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, position, email, phone, event_id } = body;

    if (!name || !email || !event_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase
      .from('event_registrations')
      .insert({ name, company, position, email, phone, event_id });

    if (error) throw error;

    // Confirmation email
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: `BENEFIT Events <${process.env.RESEND_FROM_EMAIL || 'noreply@benefit.ge'}>`,
        to: email,
        subject: 'BENEFIT Talks — Registration Confirmed',
        html: `<div style="font-family:sans-serif;max-width:500px;margin:0 auto;background:#000;color:#fff;padding:40px;">
          <h1 style="font-size:24px;font-weight:bold;letter-spacing:0.1em;">BENEFIT TALKS</h1>
          <p style="color:rgba(255,255,255,0.8);margin-top:20px;">Dear ${name},</p>
          <p style="color:rgba(255,255,255,0.6);">Your registration has been confirmed. We look forward to seeing you.</p>
          <p style="color:rgba(255,255,255,0.4);font-size:12px;margin-top:40px;">BENEFIT Magazine · Tbilisi, Georgia</p>
        </div>`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Register API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
