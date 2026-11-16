# A Story I've Never Told

A single-page, silent romantic story website built with Next.js. The homepage opens directly to the story; there is no music/no-music chooser.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

Push this folder to a GitHub repository and import the repository into Vercel. Vercel will detect Next.js automatically.

## Personalize the website

- Edit the sample story, timeline, letter, and social links in `components/StoryPage.tsx`.
- Add your photos under `public/images/` and replace the photo placeholder in `components/StoryPage.tsx` with your image paths.
- Replace the WhatsApp placeholder number (`000000000000`) with your number in international format, and replace `yourusername` with your Instagram username.

The site is silent and contains no music controls or version selection screen.

## Contact form (makes messages arrive in your inbox)

The "Say something to me" form at the end of the page posts to `app/api/contact/route.ts`, which emails you the message. Replying to that email goes straight to the sender.

1. Copy `.env.example` to `.env.local` and fill it in (Gmail is the easiest):
   - `CONTACT_TO_EMAIL` – where messages should arrive
   - `SMTP_USER` – your Gmail address
   - `SMTP_PASS` – a Gmail **App password** (Google Account → Security → 2-Step Verification → App passwords)
2. On Vercel, add the same variables under **Project → Settings → Environment Variables**, then redeploy.
3. Prefer Resend instead? Set `RESEND_API_KEY` (and `CONTACT_TO_EMAIL`) and it will be used automatically.

Built-in protection: server-side validation, a hidden spam trap field, and a limit of 5 messages per 10 minutes per visitor.
