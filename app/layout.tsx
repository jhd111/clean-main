import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "A Story I've Never Told",
  description: 'A little corner of the internet for a story worth remembering.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
