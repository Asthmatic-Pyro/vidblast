import { runFfmpegPipeline } from ../ffmpeg/wrapper;
export const processVideo = async (inputUrl: string) => {
  // In MVP, delegate to FFmpeg wrapper and return placeholder URLs
  return runFfmpegPipeline(inputUrl);
};
