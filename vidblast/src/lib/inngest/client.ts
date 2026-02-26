import { Inngest } from 'inngest';
import { createClient } from '@supabase/supabase-js';

// Initialize Inngest
export const inngest = new Inngest({
  id: 'vidblast',
  name: 'VidBlast Video Processing',
  schemas: {
    'blast/start': {
      data: {
        type: 'object',
        properties: {
          blastId: { type: 'string' },
        },
        required: ['blastId'],
      },
    },
  },
});

// Types for processed versions
export interface ProcessedVersions {
  horizontal: {
    url: string;
    path: string;
    width: number;
    height: number;
    duration: number;
  };
  vertical: {
    url: string;
    path: string;
    width: number;
    height: number;
    duration: number;
  };
  square: {
    url: string;
    path: string;
    width: number;
    height: number;
    duration: number;
  };
  thumbnail: {
    url: string;
    path: string;
    width: number;
    height: number;
  };
}

// Helper to get optimal version per platform
export function getOptimalVersionForPlatform(
  versions: ProcessedVersions,
  platformId: string
): keyof ProcessedVersions {
  // Short-form video platforms prefer vertical
  const shortFormPlatforms = ['tiktok', 'instagram_reels', 'youtube_shorts', 'threads'];
  
  // Feed platforms often prefer square
  const feedPlatforms = ['instagram_feed', 'pinterest'];
  
  // Professional/long-form platforms prefer horizontal
  const horizontalPlatforms = ['youtube', 'linkedin', 'facebook', 'x', 'twitter', 'reddit', 'bluesky'];
  
  if (shortFormPlatforms.includes(platformId)) {
    return 'vertical';
  }
  
  if (feedPlatforms.includes(platformId)) {
    return 'square';
  }
  
  if (horizontalPlatforms.includes(platformId)) {
    return 'horizontal';
  }
  
  // Default to horizontal for unknown platforms
  return 'horizontal';
}

// Initialize Supabase admin client
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
