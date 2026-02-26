# VidBlast

Initial skeleton for the multi-platform video posting MVP. Goals:
- Upload → FFmpeg processing → generate 3 versions + thumbnail
- Real-time progress via Supabase Realtime / Inngest
- OAuth2 integration with 10 platforms
- Stripe-based subscriptions

File structure:
- /vidblast/src
- /vidblast/api
- /vidblast/ui

Next steps:
1) Add heartbeat tasks and CI
2) Implement core endpoints for blast creation
3) Wire up FFmpeg pipeline

