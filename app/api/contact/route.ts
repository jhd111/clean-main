import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Best-effort rate limit (per server instance): 5 messages / 10 minutes / IP.
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < WINDOW);
  if (recent.length >= LIMIT) { hits.set(ip, recent); return true; }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const clean = (v: unknown, max: number) =>
  typeof v === 'string' ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max) : '';
const oneLine = (v: string) => v.replace(/[\r\n]+/g, ' ');
const esc = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function deliver(name: string, email: string, message: string) {
  const to = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
  if (!to) throw new Error('not-configured');

  const subject = `New message from ${oneLine(name)} — A Story I've Never Told`;
  const text = `From: ${oneLine(name)} <${email}>\n\n${message}\n`;
  const html = `<div style="font-family:Georgia,serif;max-width:560px;margin:auto;padding:24px;background:#fbf8f3;color:#2b1d20">
    <p style="letter-spacing:2px;font-size:11px;color:#b77a83;margin:0 0 12px">A NEW MESSAGE ♥</p>
    <p style="margin:0 0 4px"><strong>${esc(oneLine(name))}</strong></p>
    <p style="margin:0 0 18px;color:#75464d"><a href="mailto:${esc(email)}" style="color:#75464d">${esc(email)}</a></p>
    <div style="white-space:pre-wrap;line-height:1.7;font-size:16px;border-left:3px solid #d9a5a7;padding-left:14px">${esc(message)}</div>
  </div>`;

  // Option A — Resend (https://resend.com)
  if (process.env.RESEND_API_KEY) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || 'Untold Story <onboarding@resend.dev>',
        to: [to],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });
    if (!res.ok) throw new Error(`resend ${res.status}: ${await res.text()}`);
    return;
  }

  // Option B — any SMTP account (Gmail app password works great)
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    const nodemailer = (await import('nodemailer')).default;
    const port = Number(process.env.SMTP_PORT || 465);
    const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port,
      secure,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({
      from: `"Untold Story" <${process.env.SMTP_USER}>`,
      to,
      replyTo: `"${oneLine(name).replace(/"/g, '')}" <${email}>`,
      subject,
      text,
      html,
    });
    return;
  }

  throw new Error('not-configured');
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }

  // Honeypot: real people never fill this hidden field. Pretend it worked.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 80);
  const email = clean(body.email, 120);
  const message = clean(body.message, 2000);

  if (!name) return NextResponse.json({ error: 'Please tell me your name.' }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  if (message.length < 3) return NextResponse.json({ error: 'Please write a few words.' }, { status: 400 });

  if (limited(ip)) return NextResponse.json({ error: 'That is a lot of messages — please try again in a little while.' }, { status: 429 });

  try {
    await deliver(name, email, message);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] failed:', err);
    const notConfigured = err instanceof Error && err.message === 'not-configured';
    return NextResponse.json(
      { error: notConfigured ? 'Sending is not set up yet.' : 'Something went wrong while sending. Please try again.' },
      { status: notConfigured ? 503 : 500 }
    );
  }
}
