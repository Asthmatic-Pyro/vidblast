import { SocialPoster } from ./base;
export class TwitterAdapter implements SocialPoster { platform=twitter; async postVideo({videoUrl, caption, tokens}){ await new Promise(r=>setTimeout(r,100)); return { success:true, postUrl:https://twitter.com/status/ + Date.now(), id:tw_+Date.now() }; } }
