export const startBlastWorkflow = async (blast:any)=>{
  return {ok:true, blastId: blast?.id||blast_+Date.now()};
};
