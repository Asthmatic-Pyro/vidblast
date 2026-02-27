export interface SocialPoster {
  platform: string;
  postVideo: (payload: {videoUrl:string, caption?:string, tokens?:any}) => Promise<{success:boolean, postUrl?:string, id?:string, error?:string}>;
  getStatus?: (id:string)=>Promise<{status:string, progress?:number, error?:string}>;
}
export const delay = (ms:number)=>new Promise(r=>setTimeout(r, ms));
