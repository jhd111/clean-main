'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import Butterfly from './Butterfly';

type Fly = { top: number; size: number; duration: number; delay: number; flap: number; dir: 'right' | 'left'; w1: string; w2: string; yShift: number };

const palettes = {
  dark: [['#e58a96', '#fbe3e5'], ['#f3c6c8', '#ffffff'], ['#c9a7d8', '#f4e8fa'], ['#ecc98a', '#fff6e0']],
  light: [['#c1636f', '#f6d9dc'], ['#a77ab8', '#eadcf3'], ['#d99a6c', '#fbe9d6'], ['#b77a83', '#f4e3e5']],
};

export default function Butterflies({ count = 4, tone = 'dark' }: { count?: number; tone?: 'dark' | 'light' }) {
  const [flies, setFlies] = useState<Fly[]>([]);

  // Random after mount (avoids server/client mismatch). Fewer, smaller on phones.
  useEffect(() => {
    const small = window.matchMedia('(max-width: 700px)').matches;
    const total = small ? Math.max(2, Math.ceil(count * 0.6)) : count;
    const pal = palettes[tone];
    setFlies(
      Array.from({ length: total }, (_, i) => {
        const c = pal[i % pal.length];
        return {
          top: 8 + Math.random() * 72,
          size: small ? 22 + Math.random() * 12 : 28 + Math.random() * 18,
          duration: 20 + Math.random() * 14,
          delay: -Math.random() * 30,
          flap: 0.32 + Math.random() * 0.25,
          dir: i % 2 === 0 ? 'right' : 'left',
          w1: c[0],
          w2: c[1],
          yShift: (Math.random() - 0.5) * 16,
        } as Fly;
      })
    );
  }, [count, tone]);

  return (
    <div className="butterflies-layer" aria-hidden="true">
      {flies.map((f, i) => (
        <div
          key={i}
          className={`bf-path bf-${f.dir}`}
          style={{ top: `${f.top}%`, animationDuration: `${f.duration}s`, animationDelay: `${f.delay}s`, ['--ys' as string]: `${f.yShift}vh` } as CSSProperties}
        >
          <div className="bf-turn" style={{ ['--face' as string]: f.dir === 'right' ? '90deg' : '-90deg' } as CSSProperties}>
            <Butterfly
              style={{ width: f.size, height: f.size * 0.8, ['--w1' as string]: f.w1, ['--w2' as string]: f.w2, ['--flap' as string]: `${f.flap}s` } as CSSProperties}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
