import { YouTubeAdapter } from ./youtube;
import { LinkedInAdapter } from ./linkedin;
import { TwitterAdapter } from ./twitter;
import { TikTokAdapter } from ./tiktok;
import { InstagramAdapter } from ./instagram;
import { FacebookAdapter } from ./facebook;

export const adapters = {
  youtube: new YouTubeAdapter(),
  linkedin: new LinkedInAdapter(),
  twitter: new TwitterAdapter(),
  tiktok: new TikTokAdapter(),
  instagram: new InstagramAdapter(),
  facebook: new FacebookAdapter()
};
