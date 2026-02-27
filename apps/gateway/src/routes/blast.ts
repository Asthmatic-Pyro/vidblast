export const handleBlast = async (payload:any)=>{
  const blastId = blast_ + Date.now();
  return {blastId, status:pending};
};
