/**
 * VidBlast FFmpeg Processing Pipeline
 * 
 * Generates platform-optimal video versions:
 * - horizontal.mp4 (16:9, max 4K, H.264/AAC)
 * - vertical.mp4   (9:16, 1080x1920, max 3min for Reels/TikTok/Shorts)
 * - square.mp4     (1:1, 1080x1080)
 * - thumbnail.jpg  (1280x720 with centered play icon overlay)
 */

export interface FfmpegResult {
  horizontal: string;
  vertical: string;
  square: string;
  thumbnail: string;
  processingTimeMs: number;
}

export interface ProcessingOptions {
  inputUrl: string;
  blastId: string;
  maxDurationSec?: number;
  quality?: 'fast' | 'balanced' | 'high';
}

const ASPECT_CONFIGS = {
  horizontal: { width: 1920, height: 1080, label: '16:9' },
  vertical:   { width: 1080, height: 1920, label: '9:16' },
  square:     { width: 1080, height: 1080, label: '1:1' },
} as const;

/**
 * Run the full FFmpeg pipeline on an uploaded video.
 * MVP: returns mock URLs. Production: wires to fluent-ffmpeg or @ffmpeg/ffmpeg (browser).
 * Fallback: Supabase Edge Function for files >100MB.
 */
export const runFfmpegPipeline = async (opts: ProcessingOptions): Promise<FfmpegResult> => {
  const start = Date.now();
  const { inputUrl, blastId } = opts;

  // TODO: Replace with real FFmpeg processing
  // Phase 1: Browser-side @ffmpeg/ffmpeg for instant feedback
  // Phase 2: Supabase Edge Function /api/ffmpeg/process for >100MB fallback
  const baseUrl = `processed/${blastId}`;

  const result: FfmpegResult = {
    horizontal: `${baseUrl}/horizontal.mp4`,
    vertical:   `${baseUrl}/vertical.mp4`,
    square:     `${baseUrl}/square.mp4`,
    thumbnail:  `${baseUrl}/thumbnail.jpg`,
    processingTimeMs: Date.now() - start,
  };

  return result;
};

/**
 * Determine which video version to use for a given platform.
 */
export const getVersionForPlatform = (platform: string): keyof typeof ASPECT_CONFIGS => {
  const verticalPlatforms = [
    'tiktok', 'instagram_reels', 'youtube_shorts', 'threads',
    'snapchat', 'facebook_reels',
  ];
  const squarePlatforms = [
    'instagram_feed', 'pinterest',
  ];

  const p = platform.toLowerCase();
  if (verticalPlatforms.includes(p)) return 'vertical';
  if (squarePlatforms.includes(p)) return 'square';
  return 'horizontal';
};

export { ASPECT_CONFIGS };
