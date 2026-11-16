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
