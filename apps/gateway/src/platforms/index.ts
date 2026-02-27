import { SocialPoster } from "./base"; // Re-export interface if needed, or update base import
import { YouTubeAdapter } from "./youtube";
import { LinkedInAdapter } from "./linkedin";
import { TwitterAdapter } from "./twitter";
import { TikTokAdapter } from "./tiktok";
import { InstagramAdapter } from "./instagram";
import { FacebookAdapter } from "./facebook";

export const platforms: Record<string, any> = {
  youtube: new YouTubeAdapter(),
  linkedin: new LinkedInAdapter(),
  twitter: new TwitterAdapter(),
  tiktok: new TikTokAdapter(),
  instagram: new InstagramAdapter(),
  facebook: new FacebookAdapter(),
};

export const registerPlatform = (p: any) => { platforms[p.platform] = p; };
