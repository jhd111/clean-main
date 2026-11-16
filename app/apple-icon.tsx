import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// Icon used when the site is added to a phone's home screen.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(145deg,#5d2635,#1b1416)' }}>
        <svg width="130" height="104" viewBox="0 0 100 80">
          <path d="M50 38C60 8 94 0 97 22C100 40 72 47 50 42Z" fill="#e58a96" />
          <path d="M50 43C70 47 90 57 81 71C72 81 56 67 50 49Z" fill="#f3c6c8" />
          <g transform="translate(100,0) scale(-1,1)">
            <path d="M50 38C60 8 94 0 97 22C100 40 72 47 50 42Z" fill="#e58a96" />
            <path d="M50 43C70 47 90 57 81 71C72 81 56 67 50 49Z" fill="#f3c6c8" />
          </g>
          <ellipse cx="50" cy="42" rx="3" ry="15" fill="#fbe3e5" />
        </svg>
      </div>
    ),
    size
  );
}
