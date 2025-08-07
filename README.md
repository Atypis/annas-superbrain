# VC Partners Network Visualization

A modern, interactive web application for visualizing venture capital partners specializing in Series A/B investments, neurotechnology, BCI, and deep tech startups.

## Features

- 🎨 Beautiful, modern UI with glassmorphism and gradient effects
- 🔍 Real-time search and filtering capabilities
- 📊 Interactive partner cards with detailed information
- 🏷️ Tag-based categorization (Series A/B, Neurotech, Exits, Location)
- 📱 Fully responsive design
- ⚡ Built with Next.js 15 and TypeScript
- 🗄️ Powered by Supabase backend

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **UI Libraries**: Framer Motion, Lucide Icons
- **Backend**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment on Vercel

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com):

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Add the environment variables (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY)
4. Deploy!

The app is pre-configured with `vercel.json` for optimal deployment settings.

## Database Schema

The `vc_partners` table includes:
- Partner information (name, company, job title)
- Investment criteria flags (Series A/B, Neurotech, Notable Exits)
- LinkedIn profile URLs
- Current roles and location data
