# VidBlast — Multi-Platform Video Posting MVP

Upload once, post everywhere. VidBlast auto-converts your video to platform-optimal formats and blasts it to 50+ platforms simultaneously.

## Features (In Progress)
- FFmpeg auto-versions: horizontal (16:9), vertical (9:16), square (1:1) + thumbnail
- Real OAuth2 for YouTube, TikTok, Instagram, Facebook, Threads, X/Twitter, LinkedIn, Pinterest, Reddit, Bluesky
- Inngest async job queue for reliable multi-platform posting
- Stripe subscription tiers (Free: 5/mo, Pro: $29/mo unlimited)
- Real-time progress tracking per platform
- Self-auditing heartbeat system

## Quick Start
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env:
   ```bash
   cp vidblast/.env.example vidblast/.env.local
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000

## Architecture
- `/vidblast/api/` — API route handlers
- `/vidblast/src/` — Core logic, adapters, FFmpeg pipeline
- `/vidblast/ui/` — Frontend components
- `/vidblast/ffmpeg/` — Video processing pipeline
- `/vidblast/supabase/` — Database migrations & config
