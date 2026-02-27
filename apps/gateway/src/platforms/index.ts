export interface SocialPoster {
  platform: string;
  postVideo: (payload: {videoUrl:string, caption?:string, tokens?:any}) => Promise<{success:boolean, id?:string}>;
  getStatus?: (id:string)=>Promise<{status:string, progress?:number, error?:string}>;
}

export const platforms: Record<string, SocialPoster> = {} as any;
export const registerPlatform = (p: SocialPoster)=>{ platforms[p.platform]=p; };
