import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { company_name, industry, contact_person, email, phone, partnership_interest, message } = body;

    if (!company_name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase.from('partner_applications').insert({
      company_name, industry, contact_person, email, phone,
      partnership_interest, message,
    });

    if (error) throw error;

    // Notify team
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: `BENEFIT <${process.env.RESEND_FROM_EMAIL || 'noreply@benefit.ge'}>`,
        to: 'hello@benefit.ge',
        subject: `New Partner Application: ${company_name}`,
        html: `<p><strong>Company:</strong> ${company_name}</p><p><strong>Industry:</strong> ${industry}</p><p><strong>Contact:</strong> ${contact_person} (${email})</p><p><strong>Interest:</strong> ${Array.isArray(partnership_interest) ? partnership_interest.join(', ') : partnership_interest}</p><p><strong>Message:</strong> ${message}</p>`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Partner apply API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
