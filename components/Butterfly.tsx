import type { CSSProperties } from 'react';

// One butterfly. Colours come from the CSS vars --w1 (wings) and --w2 (spots).
export default function Butterfly({ style, className = '' }: { style?: CSSProperties; className?: string }) {
  return (
    <svg className={`bf-svg ${className}`} viewBox="0 0 100 80" style={style} aria-hidden="true">
      <g className="bf-wings">
        <g id="bf-r">
          <path d="M50 38 C60 8 94 0 97 22 C100 40 72 47 50 42 Z" fill="var(--w1,#e58a96)" />
          <path d="M50 43 C70 47 90 57 81 71 C72 81 56 67 50 49 Z" fill="var(--w1,#e58a96)" opacity=".88" />
          <circle cx="77" cy="23" r="5.5" fill="var(--w2,#fbe3e5)" opacity=".85" />
          <circle cx="71" cy="63" r="3.4" fill="var(--w2,#fbe3e5)" opacity=".85" />
        </g>
        <g transform="translate(100,0) scale(-1,1)">
          <path d="M50 38 C60 8 94 0 97 22 C100 40 72 47 50 42 Z" fill="var(--w1,#e58a96)" />
          <path d="M50 43 C70 47 90 57 81 71 C72 81 56 67 50 49 Z" fill="var(--w1,#e58a96)" opacity=".88" />
          <circle cx="77" cy="23" r="5.5" fill="var(--w2,#fbe3e5)" opacity=".85" />
          <circle cx="71" cy="63" r="3.4" fill="var(--w2,#fbe3e5)" opacity=".85" />
        </g>
      </g>
      <ellipse cx="50" cy="42" rx="2.6" ry="15" fill="#3a2428" />
      <path d="M49 28 Q44 18 39 15 M51 28 Q56 18 61 15" stroke="#3a2428" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}
