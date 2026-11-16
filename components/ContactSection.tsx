'use client';

import { useState, type FormEvent } from 'react';
import FloatingHearts from './FloatingHearts';
import Butterflies from './Butterflies';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const confetti = [
  [-120, -150], [-80, -190], [-30, -170], [20, -200], [70, -180], [120, -150],
  [-150, -90], [150, -100], [-60, -120], [60, -125], [0, -140], [100, -210],
];

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      setStatus('sent');
      setName(''); setEmail(''); setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const sending = status === 'sending';

  return (
    <section className="contact-section" id="contact">
      <FloatingHearts count={10} />
      <Butterflies count={3} tone="dark" />
      <div className="contact-inner reveal">
        <span className="contact-heart beat" aria-hidden="true">♥</span>
        <p className="eyebrow">YOUR TURN</p>
        <h2>Say something<br /><em>to me.</em></h2>
        <p className="contact-copy">If any of this reached your heart, I would love to hear it. Leave a few words — I read every single one.</p>

        {status === 'sent' ? (
          <div className="contact-sent" role="status" aria-live="polite">
            <div className="sent-burst" aria-hidden="true">
              {confetti.map(([x, y], i) => (
                <span key={i} style={{ ['--x' as string]: `${x}px`, ['--y' as string]: `${y}px`, animationDelay: `${i * 0.05}s` }}>♥</span>
              ))}
            </div>
            <span className="sent-heart beat" aria-hidden="true">♥</span>
            <h3>Your words are on their way.</h3>
            <p>Thank you for writing to me. It means more than you know.</p>
            <button type="button" className="contact-again" onClick={() => setStatus('idle')}>WRITE ANOTHER ↺</button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={submit} aria-busy={sending}>
            <div className="field">
              <label htmlFor="c-name">YOUR NAME</label>
              <input id="c-name" name="name" type="text" autoComplete="name" placeholder="What should I call you?" required maxLength={80} value={name} onChange={e => setName(e.target.value)} disabled={sending} />
            </div>
            <div className="field">
              <label htmlFor="c-email">YOUR EMAIL</label>
              <input id="c-email" name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" placeholder="So I can write back" required maxLength={120} value={email} onChange={e => setEmail(e.target.value)} disabled={sending} />
            </div>
            <div className="field">
              <label htmlFor="c-message">YOUR MESSAGE</label>
              <textarea id="c-message" name="message" rows={5} placeholder="Write whatever is in your heart…" required minLength={3} maxLength={2000} value={message} onChange={e => setMessage(e.target.value)} disabled={sending} />
              <span className="char-count">{message.length} / 2000</span>
            </div>

            <div className="hp" aria-hidden="true">
              <label htmlFor="c-website">Leave this empty</label>
              <input id="c-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} />
            </div>

            {status === 'error' && <p className="contact-error" role="alert">{error}</p>}

            <button type="submit" className="contact-send" disabled={sending}>
              {sending ? <>SENDING <span className="beat">♥</span></> : <>SEND WITH LOVE <span>♥</span></>}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
