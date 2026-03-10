// VidBlast - Blast API endpoint
export interface BlastPayload {
  videoUrl: string;
  caption: string;
  platforms: string[];
}

export interface BlastResult {
  success: boolean;
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

export const createBlast = async (payload: BlastPayload): Promise<BlastResult> => {
  return { success: true, id: `blast_${Date.now()}`, status: 'pending' };
};
