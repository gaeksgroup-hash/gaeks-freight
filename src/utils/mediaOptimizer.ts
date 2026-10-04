export interface PreparedMedia {
  file: File;
  poster?: File;
  originalBytes: number;
  optimized: boolean;
}

type ProgressHandler = (progress: number) => void;

const safeStem = (name: string) => {
  const stem = name.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '');
  return stem || 'hero-video';
};

const waitForEvent = (target: EventTarget, eventName: string, errorName = 'error') => new Promise<void>((resolve, reject) => {
  const onReady = () => { cleanup(); resolve(); };
  const onError = () => { cleanup(); reject(new Error('File video tidak dapat dibaca oleh browser ini.')); };
  const cleanup = () => {
    target.removeEventListener(eventName, onReady);
    target.removeEventListener(errorName, onError);
  };
  target.addEventListener(eventName, onReady, { once: true });
  target.addEventListener(errorName, onError, { once: true });
});

const seekVideo = async (video: HTMLVideoElement, seconds: number) => {
  if (Math.abs(video.currentTime - seconds) < 0.02) return;
  const ready = waitForEvent(video, 'seeked');
  video.currentTime = seconds;
  await ready;
};

const canvasBlob = (canvas: HTMLCanvasElement, type: string, quality: number) => new Promise<Blob>((resolve, reject) => {
  canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Poster video gagal dibuat.')), type, quality);
});

const bestRecorderType = () => [
  'video/webm;codecs=vp9',
  'video/webm;codecs=vp8',
  'video/webm',
].find((type) => MediaRecorder.isTypeSupported(type));

async function optimizeVideo(file: File, onProgress: ProgressHandler): Promise<PreparedMedia> {
  if (!('MediaRecorder' in window) || !HTMLCanvasElement.prototype.captureStream) {
    throw new Error('Browser ini belum mendukung render video. Gunakan Chrome atau Edge versi terbaru.');
  }
  const recorderType = bestRecorderType();
  if (!recorderType) throw new Error('Encoder WebM tidak tersedia di browser ini.');

  const sourceUrl = URL.createObjectURL(file);
  const video = document.createElement('video');
  video.src = sourceUrl;
  video.muted = true;
  video.playsInline = true;
  video.preload = 'auto';

  try {
    await waitForEvent(video, 'loadedmetadata');
    if (!Number.isFinite(video.duration) || video.duration <= 0) throw new Error('Durasi video tidak valid.');
    if (video.duration > 90) throw new Error('Video hero maksimal 90 detik agar proses dan pemuatan publik tetap ringan.');

    const scale = Math.min(1, 1280 / video.videoWidth, 720 / video.videoHeight);
    const width = Math.max(2, Math.round((video.videoWidth * scale) / 2) * 2);
    const height = Math.max(2, Math.round((video.videoHeight * scale) / 2) * 2);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) throw new Error('Renderer video tidak tersedia.');

    await seekVideo(video, Math.min(0.35, video.duration * 0.08));
    context.drawImage(video, 0, 0, width, height);
    const posterBlob = await canvasBlob(canvas, 'image/webp', 0.78);
    const poster = new File([posterBlob], `${safeStem(file.name)}-poster.webp`, { type: 'image/webp', lastModified: Date.now() });
    await seekVideo(video, 0);

    const stream = canvas.captureStream(24);
    const recorder = new MediaRecorder(stream, { mimeType: recorderType, videoBitsPerSecond: 1_800_000 });
    const chunks: Blob[] = [];
    const recorded = new Promise<Blob>((resolve, reject) => {
      recorder.addEventListener('dataavailable', (event) => { if (event.data.size > 0) chunks.push(event.data); });
      recorder.addEventListener('error', () => reject(new Error('Render video terhenti.')));
      recorder.addEventListener('stop', () => resolve(new Blob(chunks, { type: 'video/webm' })));
    });

    let frameHandle = 0;
    let intervalHandle = 0;
    let stopped = false;
    const draw = () => {
      if (video.paused || video.ended) return;
      context.drawImage(video, 0, 0, width, height);
      onProgress(Math.min(99, Math.max(1, Math.round((video.currentTime / video.duration) * 100))));
      const frameVideo = video as HTMLVideoElement & { requestVideoFrameCallback?: (callback: () => void) => number };
      if (frameVideo.requestVideoFrameCallback) frameHandle = frameVideo.requestVideoFrameCallback(draw);
    };
    const finish = () => {
      if (stopped) return;
      stopped = true;
      context.drawImage(video, 0, 0, width, height);
      if (recorder.state !== 'inactive') recorder.stop();
    };
    video.addEventListener('ended', finish, { once: true });
    recorder.start(1000);
    const frameVideo = video as HTMLVideoElement & { requestVideoFrameCallback?: (callback: () => void) => number; cancelVideoFrameCallback?: (handle: number) => void };
    if (frameVideo.requestVideoFrameCallback) frameHandle = frameVideo.requestVideoFrameCallback(draw);
    else intervalHandle = window.setInterval(() => {
      if (!video.paused && !video.ended) {
        context.drawImage(video, 0, 0, width, height);
        onProgress(Math.min(99, Math.round((video.currentTime / video.duration) * 100)));
      }
    }, 42);
    await video.play();
    const rendered = await recorded;
    if (frameHandle && frameVideo.cancelVideoFrameCallback) frameVideo.cancelVideoFrameCallback(frameHandle);
    if (intervalHandle) window.clearInterval(intervalHandle);
    stream.getTracks().forEach((track) => track.stop());
    if (rendered.size < 1024) throw new Error('Hasil render video kosong.');
    onProgress(100);
    return {
      file: new File([rendered], `${safeStem(file.name)}-optimized.webm`, { type: 'video/webm', lastModified: Date.now() }),
      poster,
      originalBytes: file.size,
      optimized: true,
    };
  } finally {
    video.pause();
    video.removeAttribute('src');
    video.load();
    URL.revokeObjectURL(sourceUrl);
  }
}

export async function prepareMediaForUpload(file: File, onProgress: ProgressHandler = () => {}): Promise<PreparedMedia> {
  if (file.type.startsWith('video/')) return optimizeVideo(file, onProgress);
  return { file, originalBytes: file.size, optimized: false };
}
