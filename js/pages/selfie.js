import { postPhaseTwo } from '../api.js';
import { saveAI, saveImageBase64 } from '../storage.js';

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('capture-btn');
const errorDiv = document.getElementById('error-message');
let stream = null;
let loading = false;

async function start() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
    video.srcObject = stream;
    await video.play();
  } catch (e) {
    errorDiv.textContent = e?.message ?? 'Camera permission denied or unavailable.';
    errorDiv.classList.remove('hidden');
    captureBtn.disabled = true;
  }
}

start();

captureBtn.addEventListener('click', async () => {
  if (!video || !canvas || loading) return;

  loading = true;
  errorDiv.classList.add('hidden');
  captureBtn.disabled = true;
  captureBtn.textContent = 'CAPTURING...';

  try {
    const w = video.videoWidth || 640;
    const h = video.videoHeight || 480;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas not supported.');
    ctx.drawImage(video, 0, 0, w, h);

    const b64 = canvas.toDataURL('image/png');
    saveImageBase64(b64);

    const json = await postPhaseTwo({ Image: b64 });
    saveAI(json);
    
    // Stop camera
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
    }
    
    window.location.href = 'demographics.html';
  } catch (e) {
    errorDiv.textContent = e?.message ?? 'Failed to capture selfie.';
    errorDiv.classList.remove('hidden');
    captureBtn.disabled = false;
    captureBtn.textContent = 'CAPTURE & ANALYZE';
    loading = false;
  }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
  }
});

