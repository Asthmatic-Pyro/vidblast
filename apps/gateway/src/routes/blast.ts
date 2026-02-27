import { adapters } from ../platforms;
export const handleBlast = async (payload:any)=> {
  const { videoUrl, caption, tokens, platforms } = payload;
  const results = await Promise.all((platforms||[youtube,linkedin,twitter,tiktok,instagram,facebook]).map(async (p:string)=>{
    const adapter = adapters[p];
    if(!adapter) return { platform:p, success:false, postUrl: null, error:no_adapter };
    try{
      const res = await adapter.postVideo({ videoUrl, caption, tokens});
      return { platform:p, ...res };
    }catch(e:any){ return { platform:p, success:false, error:String(e?.message||e)}; }
  }));
  return { blastId: blast_+Date.now(), statuses: results };
};
