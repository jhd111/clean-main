'use client';

import { useEffect, useRef, useState } from 'react';
import { track } from '@vercel/analytics';
import FloatingHearts from './FloatingHearts';
import Butterflies from './Butterflies';
import Butterfly from './Butterfly';
import IntroSplash from './IntroSplash';
import ContactSection from './ContactSection';
import FloatingSocial from './FloatingSocial';

type Props = { music: boolean };

// ✏️ Put your WhatsApp number here: country code + number, digits only (no +, spaces or dashes).
// Example for Pakistan: 923001234567
const WHATSAPP_NUMBER = '923039712240';
// The message that appears ready-to-send in her WhatsApp when she taps the link.
const WHATSAPP_MESSAGE = 'I love you too\nMy love, I will unblock you immediately.';
// Records a "whatsapp_click" event in Google Analytics (and Vercel Analytics on plans that support custom events).
const trackWhatsAppClick = () => {
  try {
    (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.('event', 'whatsapp_click', { link_url: 'wa.me', transport_type: 'beacon' });
    track('whatsapp_click');
  } catch {}
};
const INSTAGRAM_URL = 'https://www.instagram.com/jahad.ali111?knvt=aXd5cm40MmhjNjVp';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const moments = [
  { number: '01', date: 'آغاز', title: 'جب پہلی بار تمہیں دیکھا', text: 'میں نے تمہیں پہلی بار تمہاری گلی میں ہی دیکھا تھا۔ اُس دن ٹرانسفارمر خراب تھا اور واپڈا والے اسے ٹھیک کر رہے تھے۔ میں بھی وہیں موجود تھا۔  تم گھر سے اکیڈمی جانے کے لیے نکلی تھیں تو تم نے سفید یونیفارم پہنا ہوا تھا۔ میں نے تمہیں ایک جھلک دیکھا، پھر دوبارہ دیکھا۔'},
  { number: '02', date: 'راستے میں کہیں', title: 'چھوٹی چھوٹی باتیں', text: '  ایک دفعہ صبح کے وقت میں اکیڈمی جا رہا تھا اور تم بھی اپنے ابو کے ساتھ بائیک پر پیچھے بیٹھی جا رہی تھیں۔ میں تمہارے پیچھے آ رہا تھا اور دل ہی دل میں تمہاری خوبصورتی کو سراہ رہا تھا۔ تمہارے ابو نے نور مسجد کی طرف موڑ لے لیا، جبکہ میں گورنمنٹ پرائمری اسکول والی گلی سے پولیس اسٹیشن کی طرف چلا گیا۔ لیکن تم مجھے نظر نہیں آئیں۔ پھر جب میں گلی کے آخر میں مڑتے ہوئے پیچھے دیکھا تو تم لوگ آ رہے تھے۔ اس کے بعد سر رضوان والی اکیڈمی کے باہر سے گزرتے ہوئے بھی تمہیں کئی دفعہ دیکھا۔ تم اپنی بہن اور ابو کے ساتھ بیکن جاتے ہوئے نظر آتی تھیں۔ ایک دو دفعہ صبح کے وقت تمہیں واٹر فلٹر کے پاس بھی دیکھا تھا۔ شاید تم پانی لینے آئی ہوئی تھیں اور بائیک کے پاس کھڑی تھیں ۔ لیکن مجھے یقین نہیں کہ وہ تم ہی تھیں یا کوئی اور۔ میں اکیڈمی سے واپس آ رہا تھا جب میں نے تمہیں وہاں دیکھا جہاں آج کل الفلاح بینک ہے۔ تم اپنی کسی دوست کے ساتھ کھڑی تھیں اور کھلکھلا کر ہنس رہی تھیں۔'},
  { number: '03', date: 'بے خبری میں', title: 'جب یہ ایک احساس بن گیا', text: ' تم مجھے پہلے سے ہی اچھی لگتی تھیں، پھر آہستہ آہستہ تم مجھے اور بھی زیادہ پسند آنے لگیں۔ جب تم اکیڈمی جاتی تھیں تو میں وقت کی پابندی سے آنے اور جانے کے اوقات میں تمہیں دیکھا کرتا تھا۔ اتنے میں سردیاں آ گئیں، بالکل ویسی ہی جیسی آج کل ہیں۔ دن چھوٹے ہو گئے اور ایک نئی مشکل پیش آ گئی۔ اندھیرے کی وجہ سے تمہارا چہرہ ٹھیک سے نظر نہیں آتا تھا۔ ایک دفعہ دن کے وقت تم سامنے سے آ رہی تھیں اور میں اپنے موبائل سے اپنی تصویر بنا رہا تھا۔ اچانک تم اُس گلی میں داخل ہوئیں جو پُلی کے ساتھ ہے۔ تم نے اپنا چہرہ دیوار کی طرف کر لیا اور میں نے فوراً موبائل اپنی جیب میں ڈال لیا۔ میری یک طرفہ محبت کے جذبات دن بہ دن بڑھتے گئے۔ جب بھی تم میرے سامنے آتی تھیں تو میرا جسم جیسے ٹھنڈا پڑ جاتا تھا اور سینے میں ایک عجیب سی سنسناہٹ شروع ہو جاتی تھی۔ اب پتا چلا ہے کہ یہ سب اسٹریس کی وجہ سے بھی ہو سکتا ہے۔ ایک دفعہ میں نے تم سے یہ بھی کہا تھا کہ میری طرف بھی دیکھ لیا کرو۔ پتا نہیں تم نے میری بات سنی تھی یا نہیں۔ ' },
  { number: '04', date: 'ایک خیال جو سنبھال رکھا', title: 'وہ باتیں جو کبھی نہ کہیں', text: '  تمہاری کلاس یا کسی سیکشن کی ایک لڑکی تھی، نوشی رانا۔ اُس سے فیس بک پر بات ہوئی تھی۔ میں نے اُس سے تمہارے بارے میں پوچھا، لیکن اسے بھی کچھ پتا نہیں تھا۔ اُسی نے بتایا تھا کہ گورنمنٹ کالج فار گرلز میں تمہارے پارٹ ٹو کے پیپرز ہیں۔ پھر وہ بھی غائب ہو گئی۔ ایک اور لڑکی تھی، نمرہ، جو ہمارے محلے کی ہی تھی۔ وہ بھی بیکن میں تھی اور تمہاری کلاس میں تھی، لیکن اسے بھی تمہارے بارے میں کچھ پتا نہیں تھا۔ اصل مسئلہ یہ تھا کہ تم سے میری کبھی بات ہی نہیں ہو پاتی تھی۔ ہمت ہی نہیں ہوتی تھی، یار۔ ایک دفعہ کوشش بھی کی تھی۔ تمہارا دوسرا آخری پیپر تھا اور میرا پلان تھا کہ واٹر فلٹر والی گلی میں تم سے بات کروں، لیکن ایسا ہو نہیں سکا۔ آج بھی اس بات کا افسوس ہے۔` تمہارا ایف ایس سی کا رزلٹ بھی دیکھا تھا۔ تمہارے نمبر 700 کے آس پاس تھے۔ پھر تم مرے کالج چلی گئیں۔' },
];

export default function StoryPage({ music }: Props) {
  const [playing, setPlaying] = useState(false);
  const [entered, setEntered] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.24;
    if (!playing) audio.pause();
    else audio.play().catch(() => setPlaying(false));
  }, [playing]);

  const [bursts, setBursts] = useState<{ id: number; x: number; y: number; dx: number; dy: number; s: number; fly: boolean }[]>([]);

  // Gentle fade-and-rise reveal as sections scroll into view.
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in-view')); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
    }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Burst of hearts wherever the visitor taps/clicks.
  useEffect(() => {
    let n = 0;
    const onClick = (e: MouseEvent) => {
      const touch = window.matchMedia('(pointer: coarse)').matches;
      const made = Array.from({ length: touch ? 5 : 7 }, (_, i) => ({
        id: Date.now() + n++, x: e.clientX, y: e.clientY,
        dx: (Math.random() - 0.5) * 140, dy: -(60 + Math.random() * 120), s: 12 + Math.random() * 14, fly: i === 0,
      }));
      setBursts(b => [...b, ...made]);
      setTimeout(() => setBursts(b => b.filter(x => !made.includes(x))), 1500);
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  const toggleMusic = () => setPlaying(value => !value);

  return <main className={`story-page${introDone ? ' intro-done' : ''}`}>
    {!introDone && <IntroSplash onDone={() => setIntroDone(true)} />}
    <div className="burst-layer" aria-hidden="true">{bursts.map(b => <span key={b.id} className={`burst-heart${b.fly ? ' burst-fly' : ''}`} style={{ left: b.x, top: b.y, fontSize: b.fly ? 16 : b.s, ['--dx' as string]: `${b.dx}px`, ['--dy' as string]: `${b.dy}px` }}>{b.fly ? <Butterfly style={{ width: '2.6em', height: '2.1em', ['--w1' as string]: '#f3a6b3', ['--w2' as string]: '#fff' }} /> : '♥'}</span>)}</div>
    {music && <audio ref={audioRef} src="/audio/soft-piano-loop.wav" loop preload="none" />}
    <nav className="top-nav"><a href="#top" className="wordmark">UNTOLD <span>STORY</span></a><div className="nav-right"><a href="#story" className="nav-story">The story</a><a href="#contact" className="nav-contact">Write to me</a><a href="#letter" className="nav-letter">A letter ♥</a>{music && <button className="music-toggle" onClick={toggleMusic} aria-label={playing ? 'Pause music' : 'Play music'}>{playing ? 'Ⅱ' : '♫'} <span>{playing ? 'Pause' : 'Play music'}</span></button>}</div></nav>

    <section className="story-hero" id="top">
      <FloatingHearts count={18} /><Butterflies count={5} tone="dark" /><div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/><div className="hero-content">
        <p className="eyebrow hero-fade" style={{ animationDelay: '.1s' }}>A COLLECTION OF LITTLE THOUGHTS</p>
        <h1 className="hero-fade" style={{ animationDelay: '.4s' }}>A story I told<br/><em>got blocked.</em></h1>
        <p className="hero-subtitle hero-fade" style={{ animationDelay: '.8s' }}>Some people become a beautiful part of your thoughts without ever knowing it.</p>
        <button className="discover-button hero-fade" style={{ animationDelay: '1.2s' }} onClick={() => { setEntered(true); document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' }); }}> {entered ? 'KEEP READING' : 'TAKE A LOOK INSIDE'} <span className="bounce-arrow">↓</span></button>
      </div>
      <div className="hero-bottom"><span>MY STORY · MY LITTLE THOUGHTS</span><span>SCROLL TO EXPLORE</span></div>
      <div className="hero-spark spark-a">✳</div><div className="hero-spark spark-b">♥</div><div className="hero-spark spark-c">♡</div>
    </section>

    <section className="intro-section reveal" id="story"><Butterflies count={2} tone="light" /><p className="eyebrow">BEFORE THE WORDS</p><h2>It started with<br/><em>a glimpse.</em></h2><p className="intro-copy">This isn't a story about grand gestures or perfect scenes. It's about a few moments from my side, a growing and fading feeling, and a person who became important in a way I didn't plan.</p><div className="thin-rule"><span className="beat">♥</span></div></section>

    <section className="timeline-section"><Butterflies count={3} tone="light" /><div className="section-heading reveal"><p className="eyebrow">THE LITTLE CHAPTERS</p><h2>How it <em>began.</em></h2><p>Every story has a first page. These are a few of mine.</p></div>
      <div className="timeline">{moments.map((moment, index) => <article className={`moment reveal ${index % 2 ? 'moment-right from-right' : 'from-left'}`} key={moment.number}><div className="moment-marker"><span className="marker-heart">♥</span>{moment.number}</div><div className="moment-card"><p className="moment-date">{moment.date}</p><h3>{moment.title}</h3><p className="moment-edit">{moment.text}</p></div></article>)}</div>
    </section>

    <section className="photo-section"><Butterflies count={2} tone="light" /><div className="photo-copy reveal"><p className="eyebrow">A FRAME TO REMEMBER</p><h2>A picture,<br/><em>a thousand thoughts.</em></h2><p>You don't need a hundred photographs. Sometimes one or two are enough to hold a memory. I don't have any pictures of you. Don't overreact; only people who have the link can access this site. I won't share it with anyone, and I expect you to keep it private too. </p></div><div className="photo-placeholder reveal from-right"><Butterfly className="bf-perched" style={{ ['--w1' as string]: '#c1636f', ['--w2' as string]: '#f6d9dc', ['--flap' as string]: '1.1s' }} /><div className="photo-inner"><span className="photo-plus">＋</span><span>ADD YOUR PHOTO</span><small>Replace with /public/images/memory-1.jpg</small></div><span className="photo-caption">A MOMENT WORTH KEEPING</span></div></section>

    <section className="letter-section" id="letter"><FloatingHearts count={12} /><Butterflies count={3} tone="dark" /><div className="letter-decoration">“</div><p className="eyebrow ur ur-eyebrow" dir="rtl" lang="ur">آخرکار، چند باتیں</p><h2 className="ur ur-h2" dir="rtl" lang="ur">وہ باتیں جو میں<br/><em>کبھی کہہ نہ سکا۔</em></h2>
    <div className="letter-paper ur reveal" dir="rtl" lang="ur"><p className="letter-greeting">تمہارے نام،</p>

    <p>
    پھر جب تم نظر آنا بند ہو گئیں تو میری جو روزانہ کی روٹین بن گئی تھی، تمہیں دیکھنے کی، وہ ختم ہو گئی۔ تم سے رابطہ کرنے کا بھی کوئی آپشن نہیں تھا۔ جانِ جہاں، اُس وقت میری حالت بہت خراب ہو گئی تھی۔ بہت مشکل وقت گزارا تھا۔ جتنا خود کو اُس وقت برا کہا، شاید پہلے کبھی اتنا برا نہیں کہا تھا۔

پھر میں نے راولپنڈی میں فاؤنڈیشن یونیورسٹی میں داخلہ لے لیا اور تم مرے کالج جا چکی تھیں۔ یونیورسٹی بہت کمال تھی، لڑکیاں بھی اچھی تھیں، لیکن دل میں تم ہی تھیں۔

سگریٹ تو پہلے ہی پیتا تھا، چرس بھی آزما لی۔ مزہ تو بہت آیا، لیکن ان چیزوں سے تمہارا عشق مزید بڑھ گیا۔

پھر تمہارا نمبر ملا۔

میں نے بہت ڈرتے ڈرتے تمہیں میسج کیا۔ ہاتھ کانپ رہے تھے۔ نئی سم لی تھی اور تمہیں ایس ایم ایس کیا۔ غلطی یہ کی کہ ایک ہی دفعہ بہت سارے میسج کر دیے۔ تم نے کچھ وقت بعد جواب دیا اور پوچھا کہ نمبر کیسے ملا، کیا کوئی کزن ہو؟ کزن والی بات سن کر برا لگا تھا، لیکن خیر، تم سے بات ہوئی۔

میں نے تمہیں اپنا نام نہیں بتایا تھا۔ تمہیں بتایا تھا کہ نام J سے شروع ہوتا ہے۔ تم نے کہا تھا J for جانور۔ میں اس بات پر بھی خوش تھا۔

پھر تم نے کہا کہ دوبارہ میسج نہ کرنا، لیکن میں نے پھر بھی کیا۔

ایک دفعہ ایک نمبر سے کال آئی۔ وہ کہہ رہا تھا کہ وہ تمہارا بھائی ہے اور میرے گھر آ جائے گا۔ لیکن وہ نمبر کوٹ نیناں کی طرف کسی گاؤں کا تھا اور جس کے نام پر وہ نمبر تھا، وہ تمہارا بھائی نہیں تھا۔

خیر، پھر فائنل امتحانات ہوئے۔ میرے کل چھ مضامین تھے، جن میں سے چار میں فیل ہو گیا۔ میں نے یونیورسٹی چھوڑ دی اور گھر واپس آ گیا۔

**اپریل 2018**

اپریل 2018 میں مجھے ایک بات کا پتا چلا جس نے مجھے کافی تکلیف دی۔ پتا نہیں وہ سچ تھا یا جھوٹ، لیکن مجھے معلوم ہوا کہ تم زیشان کے ساتھ بات کرتی ہو۔ یہ سن کر بہت دکھ ہوا تھا۔

پھر 2018 میں دوبارہ NUML میں داخلہ لیا۔ پہلے سمسٹر میں ڈبل روڈ پر ایک فلیٹ میں رہتا تھا۔ ساتھ ہی ایریڈ یونیورسٹی تھی۔ ایک دفعہ وہاں بھی گیا تھا اور تمہارے بھائی کو دیکھا تھا۔ اُس نے وہاں سے کون سی ڈگری کی تھی، یہ بھی معلوم ہوا تھا۔

پھر فلیٹ چھوڑ کر یونیورسٹی کے ہاسٹل میں چلا گیا۔ وہاں کچھ نئے دوست ملے جو اچھے لوگ تھے۔ اُن کے ساتھ یونیورسٹی میں پنڈی گھومتے پھرتے تھے، لیکن تم اب بھی دل میں تھیں۔

**رمضان 2019**

رمضان 2019 میں تم سے دوبارہ رابطہ کیا۔ اس دفعہ واٹس ایپ پر بات ہوئی۔ کچھ دن بات ہوتی رہی، جیسے اب ہوئی ہے۔

تب تمہیں بتایا تھا کہ تم مجھے پسند ہو، میں تم سے پیار کرتا ہوں۔ تم نے کہا تھا کہ پیار صرف گھر والوں سے ہوتا ہے، لیکن مجھے کبھی ایسا محسوس نہیں ہوا۔ میں گھر بھی بہت کم آتا تھا۔ ایک سمسٹر میں ایک یا دو دفعہ ہی گھر آتا تھا۔

پھر ایک دوپہر یونیورسٹی سے کمرے میں آیا اور موبائل چیک کیا تو دیکھا کہ تم نے دو تین میسج کیے تھے اور پھر ڈیلیٹ کر دیے تھے۔ میں نے بھی ایسا ہی کیا، دو تین میسج کیے اور ڈیلیٹ کر دیے۔

اگر تمہیں یاد ہو تو پلیز بتانا کہ تم نے کیا بھیجا تھا۔

پھر میں سو گیا۔ جب اٹھ کر دیکھا تو تم نے مجھے بلاک کر دیا تھا۔

پھر رمضان آ گیا۔ میں نے سم پر دوبارہ رابطہ کرنے کی کوشش نہیں کی۔ اس بات کا بھی افسوس ہے۔

جب بھی پنڈی سے گھر آتا تھا تو سیالکوٹ، شکرگڑھ بس اسٹینڈ پر اترتا تھا۔ وہاں ایک سگریٹ لیتا، پیتا اور تمہیں ڈھونڈتا، لیکن تم کبھی نہیں ملیں۔ پھر تم نے اپنا نمبر بھی تبدیل کر لیا۔

پھر میری ڈگری مکمل ہو گئی اور میں گھر واپس آ گیا۔ اُس وقت جب میں صبح اپنی بہن کو چھوڑنے جاتا تھا تو تم دوبارہ نظر آنے لگی تھیں۔ تمہیں دیکھ کر اچھا لگا تھا، لیکن اب حالات مختلف تھے۔

نوکری کے لیے لاہور چلا گیا۔ پھر نوکری کی پریشانیوں نے بہت پریشان کیا۔

**2025**

2025 میں فیصلہ کیا کہ اب پاکستان سے باہر نکلتے ہیں۔ سارا طریقہ کار مکمل ہوا، لیکن پھر ویزا کی پابندیاں لگ گئیں۔

پھر رمضان میں تمہیں دیکھا۔ تمہاری ہلکی سی آواز سنائی دی۔ تم کسی لڑکی سے بات کر رہی تھیں۔ پھر خیال آیا کہ تمہیں دیکھے ہوئے تو بہت وقت گزر گیا ہے، لیکن تمہاری آواز کبھی نہیں سنی تھی۔

پھر میں نے IELTS کی تیاری شروع کی، لیکن بہت بورنگ لگا۔ اس لیے IT Support کا تین ماہ والا کورس شروع کر لیا۔ وہ مکمل کیا اور دو انٹرویو دیے۔ ایک اسی نومبر 2026 میں دیا، لیکن دونوں جگہ سے ریجیکشن ہو گئی۔

تم سے بات کرنے کی خواہش ہوئی۔ سوچا کہ جہاں اتنا برا ہو رہا ہے، تھوڑا اور سہی، تمہیں ڈھونڈ لیتا ہوں۔ لیکن تم نے ماننے سے انکار کر دیا کہ تم صنوبَر نہیں ہو۔

خیر، تمہاری دو باتوں نے مجھے بہت تکلیف دی تھی۔ پہلی بات تم نے پوچھی تھی کہ تم کون سے سال والے ہو؟ دوسری بات یہ کہ تمہاری طرف سے ہماری کہانی کبھی شروع ہی نہیں ہوئی تھی۔

دکھ ہوا تھا، بہت دکھ ہوا تھا۔

لیکن ان سب میں ایک اچھی بات ہوئی کہ کم از کم تمہیں پتا تو چلا کہ میں بھی موجود ہوں اور تمہیں کتنا پسند کرتا ہوں۔

تم مجھے آوارہ یا تھرکی سمجھتی ہو تو کوئی بات نہیں۔

17 نومبر 2026 کی رات تم میرے خواب میں بھی آئی تھیں۔ خواب میں شکل تمہاری ہی تھی۔

پچھلے ہفتے تمہیں دیکھا تھا۔ تم اپنے دروازے میں کھڑی تھیں، تمہاری امی بیٹھی ہوئی تھیں اور شاید تمہارے بھائی کا بیٹا گلی میں کھیل رہا تھا۔
ایک اور بات، جب مرے کالج میں ایک لڑکی نے تمہیں میرے بارے میں بتایا تھا تو تم نے انکار کر دیا تھا، یار۔
کیا تمہیں کبھی محسوس نہیں ہوا کہ میں تمہیں کتنا پسند کرتا ہوں؟ سنا تھا کہ لڑکیوں کو پتا چل جاتا ہے۔
آخر میں بس اتنا کہ تم پیاری ہو۔ تھوڑا آہستہ چلا کرو۔ اب تم بڑی ہو گئی ہو تو دوپٹہ کندھے پر رکھنے کے بجائے لے لیا کرو۔ لیکن تمہاری مرضی ہے، جیسے چاہو کرو۔
     </p><p className="letter-signoff">خلوص کے ساتھ،<br/><em>کوئی جسے سب یاد ہے۔</em></p></div></section>

    <section className="closing-section"><FloatingHearts count={10} /><Butterflies count={3} tone="light" /><span className="closing-star beat">♥</span><p className="eyebrow">AND THAT'S MY LITTLE STORY</p><h2>Some feelings are<br/><em>quietly beautiful.</em></h2><p>Thank you for being a part of a chapter, even if you never knew you were.</p><div className="closing-links"><a className="back-top" href="#top">BACK TO THE BEGINNING ↑</a><a className="back-top write-link" href="#contact">WRITE TO ME ↓</a></div></section>

    <ContactSection />
    {introDone && <FloatingSocial whatsappUrl={WHATSAPP_URL} instagramUrl={INSTAGRAM_URL} onWhatsAppClick={trackWhatsAppClick} />}

    <footer className="site-footer"><div><a className="wordmark" href="#top">UNTOLD <span>STORY</span></a><p>Made with care, and a little courage.</p></div><div className="social-links"><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" onClick={trackWhatsAppClick}>WhatsApp ↗</a><a href="https://www.instagram.com/jahad.ali111?knvt=aXd5cm40MmhjNjVp" target="_blank" rel="noreferrer">Instagram ↗</a></div><span className="footer-note">© A STORY KEPT WITH CARE</span></footer>
  </main>;
}
