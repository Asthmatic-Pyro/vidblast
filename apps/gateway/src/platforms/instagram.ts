import { SocialPoster } from ./base;
export class InstagramAdapter implements SocialPoster { platform=instagram; async postVideo({videoUrl, caption, tokens}){ await new Promise(r=>setTimeout(r,120)); return { success:true, postUrl:https://www.instagram.com/p/+Date.now(), id:ig_+Date.now() }; } }
