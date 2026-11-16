'use client';

import { useEffect, useRef, useState } from 'react';
import FloatingHearts from './FloatingHearts';

type Rocket = { sx: number; sy: number; tx: number; ty: number; t0: number; dur: number; color: string; heart: boolean; done: boolean };
type Spark = { x: number; y: number; vx: number; vy: number; life: number; decay: number; size: number; color: string };

const COLORS = ['#ff8fa3', '#ffd1dc', '#ffe08a', '#d7a8ff', '#ffffff', '#ff6b8b'];

export default function IntroSplash({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [textOn, setTextOn] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const leavingRef = useRef(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  const leave = (fast = false) => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setLeaving(true);
    setTimeout(() => doneRef.current(), fast ? 600 : 900);
  };

  // Keep the page still while the intro plays.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Timeline: fireworks -> welcome text -> fade away.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t1 = setTimeout(() => setTextOn(true), reduced ? 100 : 1500);
    const t2 = setTimeout(() => leave(), reduced ? 2400 : 5200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fireworks.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const small = w < 700;
    const scale = Math.min(w, h) / 420;
    const rockets: Rocket[] = [];
    const sparks: Spark[] = [];
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const pick = () => COLORS[Math.floor(Math.random() * COLORS.length)];

    const launch = (delay: number, tx: number, ty: number, heart = false) => {
      rockets.push({ sx: w * rnd(0.35, 0.65), sy: h + 10, tx, ty, t0: performance.now() + delay, dur: rnd(550, 800), color: heart ? '#ff8fa3' : pick(), heart, done: false });
    };

    // A rapid volley of crackers, then one big heart in the middle.
    const plan: [number, number, number][] = [
      [0, 0.25, 0.30], [180, 0.75, 0.26], [380, 0.50, 0.20], [600, 0.18, 0.45],
      [800, 0.82, 0.42], [1000, 0.35, 0.32], [1200, 0.66, 0.34],
    ];
    plan.forEach(([d, fx, fy]) => launch(d, w * fx, h * fy));
    launch(1500, w * 0.5, h * 0.40, true);
    launch(2100, w * 0.28, h * 0.22);
    launch(2250, w * 0.72, h * 0.24);

    const explode = (r: Rocket) => {
      if (r.heart) {
        const n = small ? 70 : 100;
        for (let i = 0; i < n; i++) {
          const t = (i / n) * Math.PI * 2;
          const hx = 16 * Math.pow(Math.sin(t), 3);
          const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
          const k = scale * 0.2 * rnd(0.95, 1.05);
          sparks.push({ x: r.tx, y: r.ty, vx: hx * k, vy: hy * k, life: 1, decay: rnd(0.006, 0.009), size: rnd(1.6, 2.6), color: Math.random() < 0.5 ? '#ff8fa3' : '#ffd1dc' });
        }
        return;
      }
      const n = small ? 46 : 70;
      const base = scale * 3.2;
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = rnd(0.4, 1) * base;
        sparks.push({ x: r.tx, y: r.ty, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, decay: rnd(0.011, 0.02), size: rnd(1.2, 2.4), color: Math.random() < 0.7 ? r.color : pick() });
      }
    };

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;

      // fade previous frame to leave glowing trails
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.22)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      for (const r of rockets) {
        if (r.done || now < r.t0) continue;
        const p = Math.min((now - r.t0) / r.dur, 1);
        const e = 1 - Math.pow(1 - p, 2.2);
        const x = r.sx + (r.tx - r.sx) * e;
        const y = r.sy + (r.ty - r.sy) * e;
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#ffe9ee';
        ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill();
        if (p >= 1) { r.done = true; explode(r); }
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.vx *= Math.pow(0.985, dt);
        s.vy = s.vy * Math.pow(0.985, dt) + 0.035 * scale * dt;
        s.x += s.vx * dt; s.y += s.vy * dt;
        s.life -= s.decay * dt;
        if (s.life <= 0) { sparks.splice(i, 1); continue; }
        ctx.globalAlpha = Math.max(s.life, 0);
        ctx.fillStyle = s.color;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <div className={`intro-splash${leaving ? ' leaving' : ''}`} onClick={() => leave(true)} role="presentation">
      <FloatingHearts count={10} />
      <canvas ref={canvasRef} className="intro-canvas" aria-hidden="true" />
      <div className={`intro-text${textOn ? ' on' : ''}`} aria-live="polite">
        <p className="intro-welcome">WELCOME,</p>
        <h1 className="intro-love">my love</h1>
        <span className="intro-heart beat">♥</span>
      </div>
      <span className="intro-skip">tap to skip</span>
    </div>
  );
}
