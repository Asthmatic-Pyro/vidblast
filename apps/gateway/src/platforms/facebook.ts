import { BasePoster } from "./base";

export class FacebookAdapter extends BasePoster {
  platform = "facebook";
  async postVideo({ videoUrl, caption, tokens }: { videoUrl: string; caption?: string; tokens?: any }) {
    // FB Graph API
    return { success: true, id: "fb_stub_" + Date.now() };
  }
}
