import { BasePoster } from "./base";

export class InstagramAdapter extends BasePoster {
  platform = "instagram";
  async postVideo({ videoUrl, caption, tokens }: { videoUrl: string; caption?: string; tokens?: any }) {
    // IG Graph API: Media Container -> Publish
    return { success: true, id: "ig_stub_" + Date.now() };
  }
}
