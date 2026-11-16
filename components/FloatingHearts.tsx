'use client';

import { useEffect, useState } from 'react';

type Heart = { left: number; size: number; delay: number; duration: number; drift: number; symbol: string; opacity: number };

const symbols = ['♥', '❤', '♡', '✿'];

export default function FloatingHearts({ count = 16 }: { count?: number }) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  // Generated after mount so server and client markup never mismatch.
  useEffect(() => {
    const small = window.matchMedia('(max-width: 700px)').matches;
    const total = small ? Math.max(4, Math.ceil(count * 0.5)) : count;
    setHearts(
      Array.from({ length: total }, (_, i) => ({
        left: Math.random() * 100,
        size: small ? 12 + Math.random() * 14 : 10 + Math.random() * 20,
        delay: -Math.random() * 14,
        duration: 9 + Math.random() * 9,
        drift: (Math.random() - 0.5) * (small ? 40 : 80),
        symbol: symbols[i % symbols.length],
        opacity: 0.18 + Math.random() * 0.35,
      }))
    );
  }, [count]);

  return (
    <div className="hearts-layer" aria-hidden="true">
      {hearts.map((h, i) => (
        <span
          key={i}
          className="float-heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            opacity: h.opacity,
            ['--drift' as string]: `${h.drift}px`,
          }}
        >
          {h.symbol}
        </span>
      ))}
    </div>
  );
}
