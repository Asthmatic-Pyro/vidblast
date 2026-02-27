import { BasePoster } from "./base";

export class LinkedInAdapter extends BasePoster {
  platform = "linkedin";

  async postVideo({ videoUrl, caption, tokens }: { videoUrl: string; caption?: string; tokens?: any }) {
    try {
      const accessToken = await this.getDecryptedToken(tokens.accessToken);
      const personUrn = tokens.personUrn; // e.g. urn:li:person:123
      
      // 1. Register Upload
      const register = await this.fetchWithRetry("https://api.linkedin.com/v2/assets?action=registerUpload", {
        method: "POST",
        headers: { Authorization: \`Bearer \${accessToken}\`, "Content-Type": "application/json" },
        body: JSON.stringify({
          registerUploadRequest: {
            recipes: ["urn:li:digitalmediaRecipe:feedshare-video"],
            owner: personUrn,
            serviceRelationships: [{ relationshipType: "OWNER", identifier: "urn:li:userGeneratedContent" }]
          }
        })
      });
      
      const uploadUrl = register.value.uploadMechanism["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"].uploadUrl;
      const asset = register.value.asset;

      // 2. Upload (Stubbed: would curl the file from videoUrl to uploadUrl)
      
      // 3. Create Post
      const post = await this.fetchWithRetry("https://api.linkedin.com/v2/ugcPosts", {
        method: "POST", 
        headers: { Authorization: \`Bearer \${accessToken}\`, "Content-Type": "application/json" },
        body: JSON.stringify({
          author: personUrn,
          lifecycleState: "PUBLISHED",
          specificContent: {
            "com.linkedin.ugc.ShareContent": {
              shareCommentary: { text: caption || "" },
              shareMediaCategory: "VIDEO",
              media: [{ status: "READY", description: { text: "Video" }, media: asset, title: { text: "Video" } }]
            }
          },
          visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" }
        })
      });

      return { success: true, id: post.id };
    } catch (e:any) {
      return { success: false, error: e.message };
    }
  }
}
