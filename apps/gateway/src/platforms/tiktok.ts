import { BasePoster } from "./base";

export class TikTokAdapter extends BasePoster {
  platform = "tiktok";
  async postVideo({ videoUrl, caption, tokens }: { videoUrl: string; caption?: string; tokens?: any }) {
    // TikTok Direct Post API
    return { success: true, id: "tt_stub_" + Date.now() };
  }
}
