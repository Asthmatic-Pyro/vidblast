import { SocialPoster } from ./base;
export class FacebookAdapter implements SocialPoster { platform=facebook; async postVideo({videoUrl, caption, tokens}){ await new Promise(r=>setTimeout(r,150)); return { success:true, postUrl:https://facebook.com/post/+Date.now(), id:fb_+Date.now() }; } }
