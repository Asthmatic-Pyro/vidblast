import { SocialPoster } from ./base;
export class LinkedInAdapter implements SocialPoster { platform=linkedin; async postVideo({videoUrl, caption, tokens}){ await new Promise(r=>setTimeout(r,100)); return { success:true, postUrl:https://www.linkedin.com/feed/update/urn:li:share: + Date.now(), id:li_+Date.now() }; } }
