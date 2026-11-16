'use client';

import { useEffect, useRef, useState } from 'react';

type Props = { music: boolean };

const moments = [
  { number: '01', date: 'THE BEGINNING', title: 'The first time I saw you', text: 'Some moments seem ordinary while they are happening. Later, you realise they quietly became the beginning of something. This is where my story starts.' },
  { number: '02', date: 'SOMEWHERE ALONG THE WAY', title: 'The little things', text: 'Maybe it was a smile, a passing moment, or something you said without thinking. Little by little, the smallest details started to mean a little more.' },
  { number: '03', date: 'WITHOUT EVEN NOTICING', title: 'When it became a feeling', text: 'I cannot point to one exact day. Somewhere between those little moments, I realised that you had become someone I thought about more often than I expected.' },
  { number: '04', date: 'A THOUGHT I KEPT', title: 'The things I never said', text: 'There were words I kept to myself, moments I replayed, and feelings I did not quite know how to explain. This little page is a way to put some of them into words.' },
];

export default function StoryPage({ music }: Props) {
  const [playing, setPlaying] = useState(false);
  const [entered, setEntered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.24;
    if (!playing) audio.pause();
    else audio.play().catch(() => setPlaying(false));
  }, [playing]);

  const toggleMusic = () => setPlaying(value => !value);

  return <main className="story-page">
    {music && <audio ref={audioRef} src="/audio/soft-piano-loop.wav" loop preload="none" />}
    <nav className="top-nav"><a href="#top" className="wordmark">UNTOLD <span>STORY</span></a><div className="nav-right"><a href="#story">The story</a><a href="#letter">A letter</a>{music && <button className="music-toggle" onClick={toggleMusic} aria-label={playing ? 'Pause music' : 'Play music'}>{playing ? 'Ⅱ' : '♫'} <span>{playing ? 'Pause' : 'Play music'}</span></button>}</div></nav>

    <section className="story-hero" id="top">
      <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/><div className="hero-content">
        <p className="eyebrow">A COLLECTION OF LITTLE MOMENTS</p>
        <h1>A story I've<br/><em>never told.</em></h1>
        <p className="hero-subtitle">Some people become a beautiful part of your thoughts without ever knowing it.</p>
        <button className="discover-button" onClick={() => { setEntered(true); document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' }); }}> {entered ? 'KEEP READING' : 'TAKE A LOOK INSIDE'} <span>↓</span></button>
      </div>
      <div className="hero-bottom"><span>ONE STORY · MANY LITTLE MOMENTS</span><span>SCROLL TO EXPLORE</span></div>
      <div className="hero-spark spark-a">✳</div><div className="hero-spark spark-b">✧</div>
    </section>

    <section className="intro-section" id="story"><p className="eyebrow">BEFORE THE WORDS</p><h2>It started with<br/><em>a moment.</em></h2><p className="intro-copy">This isn't a story about grand gestures or perfect scenes. It's about a few moments, a growing feeling, and a person who became important in a way I didn't plan.</p><div className="thin-rule"><span>✳</span></div></section>

    <section className="timeline-section"><div className="section-heading"><p className="eyebrow">THE LITTLE CHAPTERS</p><h2>How it <em>began.</em></h2><p>Every story has a first page. These are a few of mine.</p></div>
      <div className="timeline">{moments.map((moment, index) => <article className={`moment ${index % 2 ? 'moment-right' : ''}`} key={moment.number}><div className="moment-marker">{moment.number}</div><div className="moment-card"><p className="moment-date">{moment.date}</p><h3>{moment.title}</h3><p>{moment.text}</p><span className="moment-edit">YOUR MEMORY GOES HERE</span></div></article>)}</div>
    </section>

    <section className="photo-section"><div className="photo-copy"><p className="eyebrow">A FRAME TO REMEMBER</p><h2>A picture,<br/><em>a thousand thoughts.</em></h2><p>You don't need a hundred photographs. Sometimes one or two are enough to hold a memory. Replace this space with a picture you want to keep here.</p></div><div className="photo-placeholder"><div className="photo-inner"><span className="photo-plus">＋</span><span>ADD YOUR PHOTO</span><small>Replace with /public/images/memory-1.jpg</small></div><span className="photo-caption">A MOMENT WORTH KEEPING</span></div></section>

    <section className="letter-section" id="letter"><div className="letter-decoration">“</div><p className="eyebrow">A FEW WORDS, FINALLY</p><h2>Things I never<br/><em>quite said.</em></h2><div className="letter-paper"><p className="letter-greeting">Dear you,</p><p>I've wanted to put a few thoughts into words, even if I wasn't sure where to begin. There are little things about you that stayed with me, and moments that became more meaningful than you might imagine.</p><p>I don't expect anything from these words. I just wanted to make a small place for a story that has meant something to me.</p><p>Whatever happens, I hope life brings you kindness, happiness, and all the beautiful things you deserve.</p><p className="letter-signoff">With warmth,<br/><em>Someone who remembers.</em></p></div></section>

    <section className="closing-section"><span className="closing-star">✳</span><p className="eyebrow">AND THAT'S MY LITTLE STORY</p><h2>Some feelings are<br/><em>quietly beautiful.</em></h2><p>Thank you for being a part of a chapter, even if you never knew you were.</p><a className="back-top" href="#top">BACK TO THE BEGINNING ↑</a></section>

    <footer className="site-footer"><div><a className="wordmark" href="#top">UNTOLD <span>STORY</span></a><p>Made with care, and a little courage.</p></div><div className="social-links"><a href="https://wa.me/000000000000" target="_blank" rel="noreferrer">WhatsApp ↗</a><a href="https://instagram.com/yourusername" target="_blank" rel="noreferrer">Instagram ↗</a></div><span className="footer-note">© A STORY KEPT WITH CARE</span></footer>
  </main>;
}
