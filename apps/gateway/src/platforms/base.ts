import { SocialPoster } from ".";
import { decrypt } from "../vault";

export abstract class BasePoster implements SocialPoster {
  abstract platform: string;
  
  protected async getDecryptedToken(encryptedToken: string): Promise<string> {
    if (!encryptedToken) throw new Error("Missing token");
    return decrypt(encryptedToken);
  }

  protected async fetchWithRetry(url: string, options: any, retries = 3): Promise<any> {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(url, options);
        if (!res.ok) {
          if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`);
          const body = await res.text();
          throw new Error(`HTTP ${res.status}: ${body}`);
        }
        return res.json();
      } catch (err:any) {
        if (i === retries - 1) throw err;
        const delay = Math.pow(2, i) * 1000 + Math.random() * 1000;
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }

  abstract postVideo(payload: { videoUrl: string; caption?: string; tokens?: any; }): Promise<{ success: boolean; id?: string; error?: string; }>;
}
