import { SocialPoster } from ./base;
import { delay } from ./base;
export class YouTubeAdapter implements SocialPoster { platform=youtube; async postVideo({videoUrl, caption, tokens}){ const token = tokens?.accessToken; // decrypt here in real impl
  // simulate API call
  await delay(200);
  return { success:true, postUrl: https://youtube.com/watch?v=+Date.now(), id:yt_+Date.now() };
}}
