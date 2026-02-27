import { SocialPoster } from ./base;
export class TikTokAdapter implements SocialPoster { platform=tiktok; async postVideo({videoUrl, caption, tokens}){ await new Promise(r=>setTimeout(r,120)); return { success:true, postUrl:https://www.tiktok.com/@user/video/+Date.now(), id:tt_+Date.now() }; } }
